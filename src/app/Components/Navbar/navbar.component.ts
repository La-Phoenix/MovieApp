import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/Services/Data/data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  form!: FormGroup;
  search!: string;

  constructor(
    private dataService: DataService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      search: [this.search, Validators.required],
    });
  }

  searchMovie(): void {
    if (this.form.valid) {
      console.log(this.form.value);
      this.router.navigateByUrl(
        `movie/search?query=${this.form.value.search.trim()}`
      );
    }
  }
}
