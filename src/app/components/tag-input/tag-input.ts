import {
  Component,
  signal,
  computed,
  ElementRef,
  ViewChild,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-tag-input',
  imports: [CommonModule, FormsModule],
  templateUrl: './tag-input.html',
  styleUrl: './tag-input.css',
})
export class TagInputComponent implements OnInit, OnDestroy {
  @ViewChild('inputRef', { static: true }) inputRef!: ElementRef<HTMLInputElement>;

  private readonly destroy$ = new Subject<void>();
  private readonly searchSubject = new Subject<string>();

  // Signals for state management
  readonly inputValue = signal('');
  readonly selectedUsers = signal<User[]>([]);
  readonly suggestions = signal<User[]>([]);
  readonly isLoading = signal(false);
  readonly showSuggestions = signal(false);
  readonly activeSuggestionIndex = signal(-1);
  readonly errorMessage = signal('');

  // Computed values
  readonly hasSelectedUsers = computed(() => this.selectedUsers().length > 0);
  readonly hasSuggestions = computed(() => this.suggestions().length > 0);

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.setupSearch();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private setupSearch(): void {
    this.searchSubject
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((query) => {
          if (!query.trim()) {
            this.suggestions.set([]);
            this.showSuggestions.set(false);
            this.isLoading.set(false);
            return [];
          }

          this.isLoading.set(true);
          return this.userService.searchUsers(query);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((users) => {
        // Filter out already selected users
        const filteredUsers = users.filter(
          (user: User) => !this.selectedUsers().some((selected) => selected.id === user.id)
        );

        this.suggestions.set(filteredUsers);
        this.showSuggestions.set(filteredUsers.length > 0);
        this.activeSuggestionIndex.set(-1);
        this.isLoading.set(false);
      });
  }

  onInputChange(value: string): void {
    this.inputValue.set(value);
    this.searchSubject.next(value);
    // Clear error message when user starts typing
    if (this.errorMessage()) {
      this.errorMessage.set('');
    }
  }

  onInputKeydown(event: KeyboardEvent): void {
    const suggestions = this.suggestions();
    const activeIndex = this.activeSuggestionIndex();
    const totalOptions = suggestions.length;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        if (totalOptions > 0) {
          const newIndex = activeIndex < totalOptions - 1 ? activeIndex + 1 : 0;
          this.activeSuggestionIndex.set(newIndex);
        }
        break;

      case 'ArrowUp':
        event.preventDefault();
        if (totalOptions > 0) {
          const newIndex = activeIndex > 0 ? activeIndex - 1 : totalOptions - 1;
          this.activeSuggestionIndex.set(newIndex);
        }
        break;

      case 'Enter':
        event.preventDefault();
        if (activeIndex >= 0 && activeIndex < suggestions.length) {
          // Select existing user from suggestions
          this.selectUser(suggestions[activeIndex]);
        } else if (this.inputValue().trim()) {
          // Create new user from input value
          this.createAndSelectNewUser();
        }
        break;

      case 'Escape':
        this.hideSuggestions();
        break;

      case 'Backspace':
        if (!this.inputValue() && this.hasSelectedUsers()) {
          const users = this.selectedUsers();
          this.selectedUsers.set(users.slice(0, -1));
        }
        break;
    }
  }

  selectUser(user: User): void {
    const currentUsers = this.selectedUsers();
    if (!currentUsers.some((selected) => selected.id === user.id)) {
      this.selectedUsers.set([...currentUsers, user]);
    }

    this.inputValue.set('');
    this.errorMessage.set('');
    this.hideSuggestions();
    this.focusInput();
  }

  removeUser(userId: number): void {
    const filteredUsers = this.selectedUsers().filter((user) => user.id !== userId);
    this.selectedUsers.set(filteredUsers);
    // Clear error if removing an invalid user fixes the issue
    const hasInvalidUsers = filteredUsers.some(user => user.isInvalid);
    if (!hasInvalidUsers) {
      this.errorMessage.set('');
    }
    this.focusInput();
  }

  onSuggestionClick(user: User): void {
    this.selectUser(user);
  }

  onSuggestionMouseEnter(index: number): void {
    this.activeSuggestionIndex.set(index);
  }

  onInputFocus(): void {
    if (this.inputValue().trim()) {
      this.showSuggestions.set(this.hasSuggestions());
    }
  }

  createAndSelectNewUser(): void {
    const input = this.inputValue().trim();
    if (!input) {
      return;
    }

    // Clear any previous error
    this.errorMessage.set('');

    // Check if user already exists
    const alreadySelected = this.selectedUsers().some(
      (user) =>
        user.email.toLowerCase() === input.toLowerCase() ||
        user.name.toLowerCase() === input.toLowerCase()
    );

    if (alreadySelected) {
      this.errorMessage.set('This user is already selected');
      return;
    }

    // Validate email format
    const isValidEmail = this.isValidEmail(input);
    
    if (!isValidEmail) {
      // Create user with invalid flag
      const invalidUser: User = {
        id: Date.now(), // Use timestamp as unique ID
        name: input,
        email: input,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(input)}&background=ef4444&color=ffffff`,
        isNew: true,
        isInvalid: true
      };
      
      this.selectedUsers.set([...this.selectedUsers(), invalidUser]);
      this.errorMessage.set('Invalid email format. Please enter a valid email address.');
      this.inputValue.set('');
      this.hideSuggestions();
      this.focusInput();
      return;
    }

    // Create valid user
    const newUser = this.userService.createNewUser(input);
    this.selectUser(newUser);
  }

  /**
   * Validate email format
   */
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  onCreateNewClick(): void {
    this.createAndSelectNewUser();
  }

  onInputBlur(): void {
    // Delay hiding suggestions to allow clicking on them
    setTimeout(() => {
      this.hideSuggestions();
    }, 200);
  }

  private hideSuggestions(): void {
    this.showSuggestions.set(false);
    this.activeSuggestionIndex.set(-1);
  }

  private focusInput(): void {
    setTimeout(() => {
      this.inputRef.nativeElement.focus();
    }, 0);
  }

  // Template helper methods
  trackByUserId(index: number, user: User): number {
    return user.id;
  }

  trackBySuggestionId(index: number, user: User): number {
    return user.id;
  }
}
