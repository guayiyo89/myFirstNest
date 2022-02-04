import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';


@Injectable()
export class AppService {
  constructor(private httpSvc: HttpService
    ) { }

  getHello(): string {
    return 'Hello World!';
  }

  async getNewsFromApi() {
    const url = "https://hn.algolia.com/api/v1/search_by_date?query=nodejs"
    const { data } = await firstValueFrom(this.httpSvc.get(url));
    return data.hits[0];
  }
  

}
