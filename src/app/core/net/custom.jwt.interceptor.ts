import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { DA_SERVICE_TOKEN, ITokenService, JWTTokenModel } from '@delon/auth';
import { Observable } from 'rxjs';

@Injectable()
export class CustomJwtInterceptor implements HttpInterceptor {
  constructor(@Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const newReq = req.clone({ headers: this.setJwtHeaders(req.headers) });
    return next.handle(newReq);
  }

  private setJwtHeaders(headers?: HttpHeaders): HttpHeaders {
    const accessToken = this.tokenService.get(JWTTokenModel).token;
    const refreshToken = this.tokenService.get(JWTTokenModel).refreshToken;
    headers.append('Authorization', `Bearer ${accessToken}`);
    headers.append('Refresh-Token', `Bearer ${refreshToken}`);

    return headers;
  }
}
