import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { User } from './app.user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Authenticator {
  constructor(private http: HttpClient, private cookieService: CookieService) {
  }

  public async authenticate(): Promise<boolean>{
	if(this.cookieService.check('boonJwtToken')){
		const jwtToken = this.cookieService.get('boonJwtToken');
		const headers = new HttpHeaders({
		  'Authorization': `Bearer ${jwtToken}` // Include the JWT token in the Authorization header
		});
		try{
			const response = await this.http.get<any>(`${environment.baseUrl}/api/v1/secured/verify_user`, {headers: headers}).toPromise();
			User.setUser(response.username, response.profileImageUrl);
			return true;
		} catch (error) {
			console.log("JWT authentication error :", error);	
		}
	}
	return false;
  }
}
