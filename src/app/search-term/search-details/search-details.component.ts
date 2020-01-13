import { Component, OnInit } from '@angular/core';
import { SearchWordService } from 'src/app/common/services/search-word.service';
import { SearchWord } from 'src/app/common/models/domain.model';
import { TitlebarService } from 'src/app/common/services/titlebar.service';

@Component({
  selector: 'app-search-details',
  templateUrl: './search-details.component.html',
  styleUrls: ['./search-details.component.scss']
})


export class SearchDetailsComponent implements OnInit {

  constructor(private searchWordService: SearchWordService, private titlebarService: TitlebarService) { }

  displayedColumns: string[] = ['name', 'counter'];
  weeklySource: any;
  monthlySource: any;
  dailySource: any;

  //weeklySearchTerms: SearchTerms[] = [];
  //searchWords: SearchWord[] = [];

  ngOnInit() {
    this.titlebarService.changeMessage("Search Terms");
    this.getMonthlySearches();
  }


  getMonthlySearches() {


    var weekFilter = new Date();
    weekFilter.setDate(weekFilter.getDate() - 7);

    var dayFilter = new Date();
    dayFilter.setDate(dayFilter.getDate() - 1);


    console.log("weekFilter->", Math.round(weekFilter.getTime() / 1000));
    console.log("dayFilter->", Math.round(dayFilter.getTime() / 1000));
    console.log("currentFilter->", new Date().getTime() / 1000);



    this.searchWordService.getMonthlySearches().subscribe((searchWords: any) => {
      let dailySearches: string[] = [];
      let weeklySearches: string[] = [];
      let monthySearches: string[] = [];
      searchWords.forEach((searchWord, index) => {
        monthySearches.push(searchWord.term);

        console.log("term->", searchWord.term + ":" + searchWord.creationDate.seconds);


        if (searchWord.creationDate.seconds >= Math.round(weekFilter.getTime() / 1000)) {
          weeklySearches.push(searchWord.term);
        }

        if (searchWord.creationDate.seconds >= Math.round(dayFilter.getTime() / 1000)) {
          dailySearches.push(searchWord.term);
        }

      });
      this.monthlySource = this.getSearchCounterObj(monthySearches);
      this.weeklySource = this.getSearchCounterObj(weeklySearches);
      this.dailySource = this.getSearchCounterObj(dailySearches);
    })
  }



  getSearchCounterObj(searches) {
    const count =
      searches.reduce((a, b) => ({
        ...a,
        [b]: (a[b] || 0) + 1
      }), {})


    var result = Object.keys(count).map(function (key) {
      return { "name": key, "counter": count[key] };
    });

    console.log("getWeeklySearches->", result);

    return result;
  }

}

interface SearchTerms {
  name?: string;
  counter?: number;
}