import superagent from 'superagent';

class RequestSerializer {
    indent = 2;
    ignoreKey = '-API-IGNORE';

    serialize(requestData) {
        const serializedData = JSON.stringify(
            requestData,
            this.replace.bind(this),
            this.indent);

        return serializedData;
    }

    replace(key, field) {
        const ignored = this.ignore(field);
        return ignored;
    }

    ignore(field) {
        const ignore = field && field[this.ignoreKey];

        if (!ignore) {
            return field;
        }

        const fieldCopy = { ...field };

        delete fieldCopy[this.ignoreKey];
        ignore.forEach(key => delete fieldCopy[key]);

        return fieldCopy;
    }
}

class Request {
    constructor(method, url) {
        this.method = method;
        this.url = url;
        this.serializer = new RequestSerializer();

        this.request = superagent(method, url)
            .serialize(data => this.serializer.serialize(data))
            .accept('json');
    }

    static endpoint(method, path) {
        return new Request(
            method,
            `https://opentdb.com${path}`);
    }

    body(body) {
        if (body) {
            this.request.send(body);
        }

        return this;
    }

    query(query) {
        if (query) {
            this.request.query(query);
        }

        return this;
    }

    multiPart(fields, filePath) {
        Object
            .keys(fields)
            .forEach(key => {
                this.request.field(key, fields[key])
            });

        this.request.attach('content', filePath);
        return this;
    }

    authorize() {
        const token = localStorage.getItem("cf_token");

        if (token) {
            this.request.set('Authorization', `Bearer ${token}`);
        }

        return this;
    }

    send() {
        return this.request
            .then(
                response => response,
                error => error.response);
    }
}

export function get(url, query) {
    return Request
        .endpoint('GET', url)
        .query(query)
        .authorize()
        .send();
}

export function post(url, body) {
    return Request
        .endpoint('POST', url)
        .body(body)
        .authorize()
        .send();
}

export function put(url, body) {
    return Request
        .endpoint('PUT', url)
        .body(body)
        .authorize()
        .send();
}

export function del(url, body) {
    return Request
        .endpoint('DELETE', url)
        .body(body)
        .authorize()
        .send();
}

export function uploadFile(url, fields, filePath) {
    return Request
        .endpoint('POST', url)
        .multiPart(fields, filePath)
        .authorize()
        .send();
}
