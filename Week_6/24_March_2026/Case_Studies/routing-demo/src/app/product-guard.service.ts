import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ProductGaurdService implements CanActivate {
   constructor(private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot): boolean {
    // Add your activation logic here
    const id = Number(route.paramMap.get('id'));
    if (isNaN(id) || id <= 0) {
      alert('Invalid product ID. Redirecting to product list.');
      this.router.navigate(['/products']);
      return false;
    }
    return true;
  }
}