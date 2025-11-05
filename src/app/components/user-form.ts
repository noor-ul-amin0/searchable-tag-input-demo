import { Component, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TagInputComponent } from './tag-input/tag-input';

@Component({
  selector: 'app-user-form',
  imports: [CommonModule, FormsModule, TagInputComponent],
  templateUrl: './user-form.html',
  styleUrl: './user-form.css',
})
export class UserFormComponent {
  @ViewChild(TagInputComponent) tagInputComponent!: TagInputComponent;

  readonly formTitle = signal('Email Recipients');
  readonly formDescription = signal(
    'Select users to send email to by typing their name or email address.'
  );

  onSendEmail(event: Event): void {
    event.preventDefault();

    const selectedUsers = this.tagInputComponent.selectedUsers();

    console.log('📧 Send Email Button Clicked');
    console.log('📋 Selected Users:', selectedUsers);
    console.log('📊 Summary:');
    console.log(`   • Total Recipients: ${selectedUsers.length}`);

    if (selectedUsers.length > 0) {
      console.log('   • Recipients List:');
      selectedUsers.forEach((user, index) => {
        const userType = user.isNew ? '🆕 NEW' : '👤 EXISTING';
        console.log(`     ${index + 1}. ${userType} - ${user.name} <${user.email}>`);
      });

      // Separate new and existing users for detailed logging
      const existingUsers = selectedUsers.filter((user) => !user.isNew);
      const newUsers = selectedUsers.filter((user) => user.isNew);

      if (existingUsers.length > 0) {
        console.log(`   • Existing Users (${existingUsers.length}):`, existingUsers);
      }

      if (newUsers.length > 0) {
        console.log(`   • New Users Created (${newUsers.length}):`, newUsers);
      }

      // Log email addresses for easy copy-paste
      const emailList = selectedUsers.map((user) => user.email);
      console.log('   • Email Addresses:', emailList.join(', '));
    } else {
      console.log('   ⚠️  No recipients selected');
    }

    console.log('---');
  }

  onCancel(): void {
    console.log('❌ Cancel button clicked');
    // You could reset the form here if needed
    // this.tagInputComponent.selectedUsers.set([]);
  }
}
