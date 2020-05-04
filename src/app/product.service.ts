import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';
 
@Injectable({
  providedIn: 'root'
})
export class ProductService {
 
  constructor(private database: AngularFireDatabase) { }
 
  create(product) {
  return this.database.list('/products').push(product);
  }
 
  getAll() {
    return this.database.list('/products').snapshotChanges()
    .pipe(map( action => action
      .map(a => {
        const key = a.payload.key;
        const data = a.payload.val();
        console.log(key, data)
          return  {key, data};
      })));
  }
 
  get(productId) {
    console.log(productId);
    return this.database.object('/products/' + productId).snapshotChanges();
  }

  update(productId, product) {
    return this.database.object('/products/' + productId).update(product); 
  }

  delete(productId) {
    return this.database.object('/products/' + productId).remove();
  }
}


