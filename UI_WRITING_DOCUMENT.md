# Gatherly - UI Writing Document

## Application Identity

### Application Name
**Gatherly**

### Brand Tagline
**"Plan. Invite. Celebrate."**

### Brand Description
Gatherly is a modern event planning platform that makes it simple to create events, send invitations, track RSVPs, and collaborate with your team. The name reflects the core purpose: bringing people together (gather) in a friendly, approachable way (the "ly" suffix suggests ease and simplicity).

---

## Navigation & Menu Labels

### Main Navigation
- **Dashboard** - Main overview page
- **My Events** - View all events you've created or are invited to
- **Create Event** - Button to create a new event
- **Profile** - User profile settings
- **Logout** - Sign out of account

### Sidebar Navigation (Dashboard)
- **All Events** - View all events
- **My Events** - Events you own
- **Invited Events** - Events you've been invited to

### Footer Links
- **Dashboard** - Link to main dashboard
- **Create Event** - Link to event creation
- **Features** - Link to features section
- **About** - About the application
- **Help Center** - Support documentation
- **Contact Us** - Contact information
- **Privacy Policy** - Privacy policy page
- **Terms of Service** - Terms and conditions

---

## Button Labels

### Primary Actions
- **Create Event** - Create a new event
- **Save Changes** - Save modifications to an event
- **Update Event** - Update existing event details
- **Delete Event** - Remove an event permanently
- **Confirm RSVP** - Submit RSVP response
- **Send Invitation** - Send event invitation
- **Add Collaborator** - Add team member to event
- **Update RSVP** - Update existing RSVP
- **Sign In** - Login to account
- **Sign Up** - Register new account
- **Get Started Free** - Start using the platform
- **Go to Dashboard** - Navigate to dashboard

### Secondary Actions
- **Cancel** - Cancel current action
- **Edit Event** - Modify event details
- **Remove** - Remove invitation or collaborator
- **Back to Dashboard** - Return to main page

### RSVP Buttons
- **Yes, I'll be there** - Confirming attendance
- **Maybe** - Uncertain attendance
- **Can't make it** - Declining invitation

### Form Actions
- **Create account** - Complete registration
- **Signing in...** - Login in progress
- **Creating Event...** - Event creation in progress
- **Sending Invitation...** - Invitation being sent
- **Adding Collaborator...** - Collaborator being added

---

## Form Labels & Placeholders

### Authentication Forms

#### Login Form
- **Email address** (label)
  - Placeholder: "you@example.com"
- **Password** (label)
  - Placeholder: "Enter your password"

#### Registration Form
- **Username** (label)
  - Placeholder: "Choose a username"
- **Email** (label)
  - Placeholder: "you@example.com"
- **First Name** (label)
  - Placeholder: "First Name"
- **Last Name** (label)
  - Placeholder: "Last Name"
- **Password** (label)
  - Placeholder: "Create a password"
- **Confirm Password** (label)
  - Placeholder: "Confirm your password"

### Event Creation Form
- **Event Title** (label, required)
  - Placeholder: "e.g., Summer Company Picnic"
  - Helper text: None
- **Description** (label)
  - Placeholder: "Tell your guests what to expect at this event..."
  - Helper text: None
- **Category** (label, required)
  - Placeholder: "Choose a category"
  - Options: Wedding, Meeting, Party, Conference, Other
- **Location** (label)
  - Placeholder: "e.g., Central Park, New York"
- **Start Date & Time** (label, required)
  - Placeholder: Date/time picker
- **End Date & Time** (label, required)
  - Placeholder: Date/time picker
- **Cover Image** (label)
  - Placeholder: File upload
  - Helper text: "Upload a beautiful image to represent your event (optional)"
- **Make this event public** (checkbox label)

### Invitation Form
- **Email address** (input)
  - Placeholder: "Enter email address"
- **Username** (input)
  - Placeholder: "Enter username"
- **OR** (separator text between email and username fields)

### RSVP Form
- **Number of Guests** (label)
  - Placeholder: "1"
- **Add a Comment** (label, optional)
  - Placeholder: "Let the organizer know if you have any questions or special requests..."

### Collaboration Form
- **User ID or Username** (input)
  - Placeholder: "Enter user ID or username"
- **Role** (select)
  - Options: Viewer, Editor

---

## System Messages

### Success Messages
- **"Event created successfully."** - After creating an event
- **"Event updated successfully."** - After updating event details
- **"Event deleted successfully."** - After deleting an event
- **"Invitation sent!"** - After sending invitation
- **"RSVP updated."** - After updating RSVP
- **"RSVP confirmed."** - After confirming attendance
- **"Collaborator added successfully."** - After adding team member
- **"Invitation removed."** - After removing invitation
- **"Collaborator removed successfully."** - After removing collaborator

### Error Messages

#### Authentication Errors
- **"Invalid email address."** - Invalid email format
- **"Password must be at least 6 characters."** - Password too short
- **"Invalid credentials"** - Wrong email/password combination
- **"User already exists"** - Email or username taken
- **"Registration failed. Please try again."** - General registration error
- **"Login failed. Please try again."** - General login error

#### Event Errors
- **"Event not found"** - Event doesn't exist
- **"Not authorized to edit this event"** - Insufficient permissions
- **"Not authorized to delete this event"** - Only owner can delete
- **"Failed to create event"** - General creation error
- **"Failed to update event"** - General update error
- **"Failed to delete event. Please try again."** - Deletion error

#### Invitation Errors
- **"Please provide an email address or username"** - Missing invitee info
- **"User not found"** - Invitee doesn't exist
- **"Invitation already sent"** - Duplicate invitation
- **"Failed to send invitation. Please try again."** - General error
- **"Not authorized to invite guests"** - Insufficient permissions

#### RSVP Errors
- **"You are not invited to this event"** - No invitation found
- **"Failed to update RSVP"** - General RSVP error
- **"Invalid RSVP status"** - Invalid status value

#### Collaboration Errors
- **"Please provide a user ID or username"** - Missing user info
- **"User not found"** - User doesn't exist
- **"User is already a collaborator"** - Duplicate collaboration
- **"Only event owner can add collaborators"** - Permission error
- **"Failed to add collaborator. Please try again."** - General error

#### General Errors
- **"Invalid invitation link"** - Bad invite URL
- **"Not authorized"** - Permission denied
- **"Please provide all required fields"** - Missing required data
- **"An error occurred. Please try again."** - Generic error

### Empty States

#### Dashboard
- **"No events yet"** (heading)
- **"Get started by creating your first event and inviting guests!"** (description)
- **"Create Your First Event"** (button)

#### Event Details
- **"No guests have responded yet."** - Empty RSVP list
- **"No invitations sent yet."** - Empty invitation list
- **"No collaborators added yet."** - Empty collaborator list

#### Invitations
- **"No invitations sent yet."** - When no invitations exist

#### RSVPs
- **"No guests have responded yet."** - When no RSVPs exist

---

## Confirmation Messages

### Delete Confirmations
- **"Are you sure you want to delete this event?"** (question)
- **"This action cannot be undone and all associated data will be permanently removed."** (warning)
- **"Yes, delete"** / **"No, keep it"** (buttons) - *Note: Using browser confirm dialog currently*

### Other Confirmations
- **"Are you sure you want to remove this invitation?"** - Before removing invitation
- **"Are you sure you want to remove this collaborator?"** - Before removing collaborator

---

## Page Headings & Descriptions

### Home Page
- **"Plan. Invite. Celebrate."** (main heading)
- **"Gatherly"** (subheading)
- **"The modern way to plan events, send invitations, and bring people together. Simple, collaborative, and beautifully designed."** (description)

### Dashboard
- **"My Events"** (heading)
- **"Manage all your events in one place"** (subheading)

### Create Event
- **"Create New Event"** (heading)
- **"Fill in the details below to create your event"** (subheading)

### Event Details
- **Event Title** (dynamic, from event data)
- **"Event Details"** (tab label)
- **"Guest Responses"** (tab label for RSVPs)
- **"Send Invitations"** (tab label)
- **"Team Collaborators"** (tab label)

### Login
- **"Sign in to your account"** (heading)
- **"Or create a new account"** (link text)

### Register
- **"Create your account"** (heading)
- **"Or sign in to existing account"** (link text)

---

## Feature Descriptions

### Landing Page Features
1. **Event Management**
   - Description: "Create and manage all your events in one place with detailed information and beautiful cover images."

2. **Smart Invitations**
   - Description: "Send invitations via email or username, track status, and generate unique invitation links."

3. **RSVP Tracking**
   - Description: "Real-time RSVP tracking with Yes/No/Maybe options, guest counts, and comments."

4. **Collaboration**
   - Description: "Add co-organizers with role-based permissions. Work together seamlessly."

5. **Real-Time Updates**
   - Description: "Get instant notifications and live updates on RSVPs and event changes."

6. **Beautiful Design**
   - Description: "Modern, responsive interface that works perfectly on all devices."

---

## Testimonials

### Testimonial 1
- **Name**: Sarah Johnson
- **Role**: Event Coordinator
- **Company**: Tech Events Inc.
- **Content**: "Gatherly has transformed how we manage our conferences. The RSVP tracking is incredibly accurate and the collaboration features are a game-changer."

### Testimonial 2
- **Name**: Michael Chen
- **Role**: Wedding Planner
- **Company**: Dream Weddings
- **Content**: "I love how easy it is to send invitations and track responses. My clients are always impressed with the professional look and real-time updates."

### Testimonial 3
- **Name**: Emily Rodriguez
- **Role**: Community Manager
- **Company**: Startup Hub
- **Content**: "The real-time collaboration features make it so easy to work with my team. We can all manage events together seamlessly."

---

## Call-to-Action (CTA) Text

### Primary CTAs
- **"Get Started Free"** - Main CTA on landing page
- **"Create Your First Event"** - Empty state CTA
- **"Ready to Get Started?"** - Section heading
- **"Join thousands of organizers using Gatherly to plan amazing events"** - Supporting text

### Secondary CTAs
- **"Sign In"** - Login CTA
- **"Learn More"** - Information CTA (if applicable)

---

## Footer Content

### Brand Description
**"Plan. Invite. Celebrate. Gatherly makes event planning simple, collaborative, and delightful."**

### Copyright
**"© [Year] Gatherly. All rights reserved."**

---

## Loading States

### Button Loading Text
- **"Signing in..."** - Login button
- **"Creating account..."** - Registration button
- **"Creating Event..."** - Event creation
- **"Sending Invitation..."** - Sending invitation
- **"Adding Collaborator..."** - Adding collaborator
- **"Updating..."** - General update action

### Page Loading
- Spinner with no text (visual indicator only)

---

## Accessibility Labels (ARIA)

### Navigation
- **"Gatherly Home"** - Logo link
- **"Main navigation"** - Navbar
- **"User menu"** - User dropdown
- **"Event menu"** - Event actions

### Forms
- **"Email address"** - Email input
- **"Password"** - Password input
- **"Event title"** - Title input
- **"Invitee email address"** - Invitation email
- **"Invitee username"** - Invitation username
- **"User ID or username"** - Collaborator input
- **"Collaborator role"** - Role select

### Buttons
- **"Remove invitation"** - Remove button
- **"Remove collaborator"** - Remove button
- **"Edit event"** - Edit button
- **"Delete event"** - Delete button

---

## Tone & Style Guidelines

### Tone Characteristics
- **Friendly**: Warm and approachable, not corporate or cold
- **Professional**: Competent and trustworthy
- **Clear**: Direct and easy to understand
- **Minimal**: Concise, no unnecessary words

### Writing Principles
1. **Use active voice**: "Create event" not "Event will be created"
2. **Be specific**: "Enter email address" not "Enter information"
3. **Use present tense**: "Creating..." not "Will create..."
4. **Avoid jargon**: Use plain language
5. **Be consistent**: Same terms throughout (e.g., "event" not "event/meeting/gathering")
6. **Capitalize properly**: Sentence case for most UI text, title case for headings
7. **Use contractions sparingly**: "Can't" is okay, but prefer "Cannot" in formal contexts

### Examples of Good vs. Bad

#### Good
- "Create Event"
- "Send Invitation"
- "No events yet. Get started by creating your first event!"

#### Bad
- "Create New Event Instance" (too technical)
- "Dispatch Invitation" (too formal)
- "You currently have no events in your account. Would you like to create one?" (too wordy)

---

## Special Cases

### Required Field Indicators
- Use asterisk (*) in red: **"Event Title *"**
- Or text indicator: **"Event Title (required)"**

### Optional Field Indicators
- Use gray text: **"Add a Comment (optional)"**
- Or helper text below field

### Date/Time Formatting
- Display: "January 15, 2024 at 2:00 PM"
- Input: Use native datetime-local picker

### Status Labels
- **"Attending"** - For "yes" RSVPs
- **"Maybe"** - For "maybe" RSVPs
- **"Not Attending"** - For "no" RSVPs
- **"Pending"** - For unresponded invitations
- **"Accepted"** - For accepted invitations
- **"Declined"** - For declined invitations

---

## Version History

- **Version 1.0** - November 2024
  - Initial UI writing document
  - Complete microcopy system
  - All button labels, form labels, and messages documented

---

## Notes

- All text should be reviewed for consistency before deployment
- Consider localization for future international versions
- Test all error messages with actual error scenarios
- Ensure all placeholder text is helpful and not generic
- Verify all ARIA labels are descriptive and accurate

---

**Document Owner**: Design & UX Team  
**Last Updated**: November 2024  
**Status**: Complete

