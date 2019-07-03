import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';

@Component({
	selector: 'app-artista',
	templateUrl: './artista.component.html',
	styles: []
})
export class ArtistaComponent {
	artista: any = {};
	topTracks: any[] = [];
	loading: boolean;

	constructor(private router: ActivatedRoute, private spotifyService: SpotifyService) {
		this.loading = true;

		this.router.params.subscribe((params) => {
			// console.log(params['id']);
			this.getArtista(params['id']);
			this.getTopTracks(params['id']);
		});
	}

	getArtista(id: string) {
		this.spotifyService.getArtista(id).subscribe((data) => {
			this.loading = false;
			this.artista = data;
			console.log(this.artista);
		});
	}

	getTopTracks(id: string) {
		this.spotifyService.getTopTracks(id).subscribe((topTracks) => {
			console.log(topTracks);
			this.topTracks = topTracks;
		});
	}
}
