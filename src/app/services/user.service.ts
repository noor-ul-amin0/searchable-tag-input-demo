import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, catchError, map } from 'rxjs';
import { User, DummyJsonResponse, DummyJsonUser } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly http = inject(HttpClient);
  private nextId = 1000; // Start new IDs from 1000 to avoid conflicts
  private readonly apiUrl = 'https://dummyjson.com/users/search';

  searchUsers(query: string): Observable<User[]> {
    if (!query.trim()) {
      return of([]);
    }

    // Make API call to DummyJSON
    return this.http.get<DummyJsonResponse>(`${this.apiUrl}?q=${encodeURIComponent(query)}`).pipe(
      map((response) => {
        const users = response.users.map(this.transformDummyJsonUser);
        return users;
      }),
      catchError((error) => {
        console.error('Error searching users:', error);
        return of([]); // Return empty array on error
      })
    );
  }

  /**
   * Transform DummyJSON user to our User interface
   */
  private transformDummyJsonUser(dummyUser: DummyJsonUser): User {
    return {
      id: dummyUser.id,
      name: `${dummyUser.firstName} ${dummyUser.lastName}`,
      email: dummyUser.email,
      avatar: dummyUser.image,
    };
  }

  /**
   * Create a new user from an email or name input
   * @param input - Email address or name
   * @returns New User object
   */
  createNewUser(input: string): User {
    const trimmedInput = input.trim();
    const isEmail = this.isValidEmail(trimmedInput);

    let name: string;
    let email: string;

    if (isEmail) {
      email = trimmedInput;
      // Extract name from email (part before @)
      name = trimmedInput
        .split('@')[0]
        .replace(/[._-]/g, ' ')
        .replace(/\b\w/g, (l) => l.toUpperCase());
    } else {
      name = trimmedInput;
      // Generate email from name
      email = trimmedInput.toLowerCase().replace(/\s+/g, '.') + '@example.com';
    }

    const newUser: User = {
      id: this.nextId++,
      name,
      email,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
        name
      )}&background=6b7280&color=ffffff`,
      isNew: true,
    };

    return newUser;
  }

  /**
   * Check if a string is a valid email format
   */
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
