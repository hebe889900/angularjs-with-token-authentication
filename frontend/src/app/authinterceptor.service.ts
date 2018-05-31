import { Injectable } from '@angular/core';
import { HttpInterceptor} from '@angular/common/http';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
    intercept(req, next) {
        console.log(req);
        var authRequest = req.clone({
            headers: req.headers.set('Authorization', 'token ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1YjEwMjI3NzRmMzA3YjQ1YThhYzhiMWUifQ.ez4ov5FkVG50HkhEA3oa4V_47i1NLyTAa7YJwW6uwwo')
        })
        return next.handle(authRequest);
    }
}