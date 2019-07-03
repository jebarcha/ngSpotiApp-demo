import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class SpotifyService {
	constructor(private http: HttpClient) {
		console.log('Spotify Service Listo..');
	}

	getQuery(query: string) {
		const url = `https://api.spotify.com/v1/${query}`;
		const token = 'BQBfHaQzkLKRHiN1FODCPR9MqesZZdu5bh8NkRZIqNMg3PNcpMA5QltJVGE0XR6SZqbSLdDPHNPiZjM3s5U';

		const headers = new HttpHeaders({
			Authorization: `Bearer ${token}`
		});

		return this.http.get(url, { headers });
	}

	getNewReleases() {
		return this.getQuery('browse/new-releases?limit=20').pipe(map((data) => data['albums'].items));

		// const headers = new HttpHeaders({
		// 	Authorization: 'Bearer BQDzsq9PUr3jwDz5y_512O9iEe4qxcAgqlMLcH64WHL4Ujw_yP7g5C69eqqgwcxHZCLRm2-KZSTIG5F3RbI'
		// });

		// return this.http
		// 	.get('https://api.spotify.com/v1/browse/new-releases??limit=20', { headers })
		// 	.pipe(map((data) => data['albums'].items));
	}

	getArtistas(termino: string) {
		return this.getQuery(`search?q=${termino}&type=artist&limit=15`).pipe(map((data) => data['artists'].items));

		// return this.http
		// 	.get(`https://api.spotify.com/v1/search?q=${termino}&type=artist&limit=15`, { headers })
		// 	.pipe(map((data) => data['artists'].items));
	}

	getArtista(id: string) {
		// https://api.spotify.com/v1/artists/08td7MxkoHQkXnWAYD8d6Q

		return this.getQuery(`artists/${id}`);
		// .pipe(map((data) => data['artists'].items));
	}

	getTopTracks(id: string) {
		// https://api.spotify.com/v1/artists/43ZHCT0cAZBISjO8DG9PnE/top-tracks?country=SE
		return this.getQuery(`artists/${id}/top-tracks?country=us`).pipe(map((resp) => resp['tracks']));
	}
}
