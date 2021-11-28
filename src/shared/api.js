class Api {
    url = 'http://localhost:3001'

    performRequest(url, method = 'GET', body) {
        return fetch(url, {
            method,
            body: JSON.stringify(body),
            headers: new Headers({
                'Content-type': 'application/json'
            })
        }).then(response => response.json())
    }

    getMe() {
        return this.performRequest(`${this.url}/me`)
    }

    getPosts() {
        return this.performRequest(`${this.url}/posts`)
    }
}

export default new Api()
