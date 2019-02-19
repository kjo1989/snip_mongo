import { Component, OnInit } from '@angular/core';
import {UploadService} from '../../../services/upload.service';
import {Icon} from '../../../models/Icon';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  selectedFile = null;


  after = '';

  constructor(private uploadService: UploadService) {
  }

  ngOnInit() {
  }

  onFileSelected(event) {
    const input = event.target,

      reader = new FileReader();

    reader.onload = (e: any) => {
      const dataUrl = reader.result;
      console.log(dataUrl);
      const Data = dataUrl;
      this.uploadService.sendUploadedFIle({Data}).subscribe(resp => {
        console.log(resp);
        this.after = resp.respImgO;
        console.log(resp.respImgoO);
        let review = document.getElementById('review');
        review.innerHTML = resp.respImgO
      });
    };
    reader.readAsDataURL(input.files[0]);
  }
}
