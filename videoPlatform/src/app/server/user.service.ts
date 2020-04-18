import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {catchError, map, tap} from 'rxjs/operators';
import {PagesModule} from '../pages/pages.module';
import {User} from '../models/User';
import {Video} from '../models/Video';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userResource: string;
  userResourceURL: string;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  cors = {
    headers: new HttpHeaders({ 'Access-Control-Allow-Origin': '*' })
  };

  /**
   * constructor
   */
  constructor(private http: HttpClient) {
    this.userResource = 'users';
    this.userResourceURL = `${environment.serverBaseURL}/${this.userResource}`;
  }

  /**
   * GET: search user by id
   */
  getUserById(id: string): Observable<User> {
    const url = `${this.userResourceURL}/${id}`;
    return this.http.get<User>(url).pipe(
      catchError(this.handleError<User>(`getUser id=${id}`))
    );
  }

  /**
   * Put: update user information
   */
  updateUser(user: User): Observable<User> {
    const url = `${this.userResourceURL}/update`;
    return this.http.put(url, user, this.httpOptions).pipe(
      catchError(this.handleError<any>('update user'))
    );
  }

  /**
   * Post: user do like operation to a video
   */
  likeVideo(video: Video): Observable<User>{
    const url = `${this.userResourceURL}/like`;
    return this.http.post<User>(url, video.id).pipe(
      catchError(this.handleError<User>(`like video id = ${video.id}`))
    );
  }

  /**
   * Post: user undo like operation to a video
   */
  cancelLikeVideo(video: Video): Observable<User>{
    const url = `${this.userResourceURL}/cancelLike`;
    return this.http.post<User>(url, video.id).pipe(
      catchError(this.handleError<User>(`cancel like video id = ${video.id}`))
    );
  }

  /**
   * Post: user do unlike operation to a video
   */
  unlikeVideo(video: Video): Observable<User>{
    const url = `${this.userResourceURL}/unlike`;
    return this.http.post<User>(url, video.id).pipe(
      catchError(this.handleError<User>(`unlike video id = ${video.id}`))
    );
  }

  /**
   * Post: user undo unlike operation to a video
   */
  cancelUnlikeVideo(video: Video): Observable<User> {
    const url = `${this.userResourceURL}/cancelUnlike`;
    return this.http.post<User>(url, video.id).pipe(
      catchError(this.handleError<User>(`cancel unlike video id = ${video.id}`))
    );
  }

  /**
   * POST: user set the video to favorite
   */
  setFavoriteVideo(video: Video): Observable<User>{
    const url = `${this.userResourceURL}/setFavorite`;
    return this.http.post<User>(url, video.id).pipe(
      catchError(this.handleError<User>(`favorite video id = ${video.id}`))
    );
  }

  /**
   * POST: user undo the favorite operation
   */
  unFavoriteVideo(video: Video): Observable<User>{
    const url = `${this.userResourceURL}/unFavorite`;
    return this.http.post<User>(url, video.id).pipe(
      catchError(this.handleError<User>(`unfavorite video id = ${video.id}`))
    );
  }

  /**
   * POST: user subscribe other user
   */
  subscribeUser(user: User): Observable<User>{
    const url = `${this.userResourceURL}/subscribe`;
    return this.http.post<User>(url, user, this.cors).pipe(
      catchError(this.handleError<User>(`subscribe user id = ${user.id}`))
    );
  }

  /**
   * POST: user unsubscribe other user
   */
  unSubscribeUser(user: User): Observable<User>{
    const url = `${this.userResourceURL}/unSubscribe`;
    console.log(`userid ${user.id}`);
    return this.http.post<User>(url, user, this.cors).pipe(
      catchError(this.handleError<User>(`unSubscribe user id = ${user.id}`))
    );
  }

  /**
   * POST: update user's history
   */
  unpdateHistory(video: Video): Observable<User>{
    const url = `${this.userResourceURL}/updateHistory`;
    return this.http.post<User>(url, video, this.cors).pipe(
      catchError(this.handleError<User>(`add video id = ${video.id} to history`))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}