import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public icons: any = [];
  public selectedType;
  public headIcons = null ;

  public graphicTypes = [
    { GraphicsType: 'REGULAR', Data: '/assets/media/clock-regular.svg' },
    { GraphicsType: 'FLAT', Data: '/assets/media/clock-flat.svg' },
    { GraphicsType: 'REGULAR48', Data: '/assets/media/clock-hd.svg' },
    { GraphicsType: 'LINEAR', Data: '/assets/media/clock-linear.svg' },
    { GraphicsType: 'MONO', Data: '/assets/media/clock-mono.svg' },
    { GraphicsType: 'MINI MONO', Data: '/assets/media/clock-minimono.svg' }
  ];

  organiseYourIconsImages: { path: string }[] = [
    { path: '/assets/media/home-demo-projects.png' },
    { path: '/assets/media/home-demo-projectset.png' },
    { path: '/assets/media/home-demo-projects-search.png' },
  ];

  secureRepositoryImages: { path: string }[] = [
    { path: '/assets/media/home-demo-repo-upload.png' },
    { path: '/assets/media/home-demo-repo-browse.png' },
    { path: '/assets/media/home-demo-repo-import.png' },
  ];


  constructor(private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
  }


}
