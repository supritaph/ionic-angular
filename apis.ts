import { HttpClient } from '@angular/common/http';
import { APIsModal } from './apis.modal';
import { Observable ,} from 'rxjs';
import { map } from 'rxjs/operators';

export class APIs{

    constructor (private http: HttpClient,) { 
    } 

    apiUrl="http://ec2-13-233-254-150.ap-south-1.compute.amazonaws.com/security/api/login";

    postLoginDetails(apismodal: APIsModal): Observable<any> {
        return this.http.post<any>(this.apiUrl, apismodal).pipe(map(res => res.json()));
        
            // {headers: this.header , responseType:'text'}
            // )
            // .pipe(catchError(this.handleError('loginValidateFunction','i am in error'))
            // );
        
   } 
    
}