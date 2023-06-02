import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { SearchService } from 'src/app/services/search/search.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  
  isNavigating = false;
  isDetailPage = false;
  activeTab?: string;

  constructor(
    private router: Router,
    private searchService: SearchService,
    private route: ActivatedRoute,
  ) {

    this.router.events.subscribe(
      (event) => {
        if (event instanceof NavigationStart) {
          this.isNavigating = true;
          console.log("Navigation started");
        }
        if (event instanceof NavigationEnd) {
          this.isNavigating = false;
          console.log("Navigation ended");
          this.isDetailPage = event.urlAfterRedirects.includes('/people/');
          console.log(this.isDetailPage);
        }
      }
    );
  }

  ngOnInit() {
    this.setActiveTab();
  }

  setActiveTab() {
    const childRoute = this.route.snapshot.firstChild;
    if (childRoute) {
      this.activeTab = childRoute.url[0].path;
    }
  }

  changeTab(label: string) {
    this.router.navigate([`/${label}`]);
  }

  onSearch(event: any) {
    this.searchService.setSearchTerm(event.target.value);
  }

}
