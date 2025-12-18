# Design Document

## Overview

The Daily Report Generator is a single-file web application that transforms casual Japanese input into formal business reports. The system uses a template-based approach with rule-based text processing, avoiding external APIs for complete offline functionality. The application follows a functional programming approach with clear separation of concerns across input processing, text formatting, storage management, and clipboard operations.

## Architecture

The application follows a modular functional architecture within a single HTML file:

```
┌─────────────────────────────────────────┐
│              HTML Document              │
├─────────────────────────────────────────┤
│  UI Layer (Tailwind CSS + HTML Forms)  │
├─────────────────────────────────────────┤
│           JavaScript Modules            │
│  ┌─────────────┬─────────────────────┐  │
│  │ Input       │ Text Formatter      │  │
│  │ Processor   │ - Template Assembly │  │
│  │             │ - Sentence Endings  │  │
│  ├─────────────┼─────────────────────┤  │
│  │ Storage     │ Clipboard Handler   │  │
│  │ Manager     │ - Modern API        │  │
│  │             │ - Legacy Fallback   │  │
│  └─────────────┴─────────────────────┘  │
├─────────────────────────────────────────┤
│          Browser APIs                   │
│  localStorage | navigator.clipboard     │
└─────────────────────────────────────────┘
```

## Components and Interfaces

### Input Processor
- **Purpose**: Cleans and normalizes user input text
- **Functions**:
  - `cleanBulletPoints(text)`: Removes bullet markers using regex patterns
  - `filterEmptyLines(lines)`: Removes whitespace-only lines
  - `preprocessInput(rawText)`: Orchestrates cleaning pipeline

### Text Formatter
- **Purpose**: Applies Japanese business formatting rules
- **Functions**:
  - `addSentenceEndings(line)`: Adds appropriate Japanese endings
  - `formatActivities(activities)`: Processes activity list
  - `assembleReport(activities, learning, plans)`: Combines all sections
  - `getRandomEnding()`: Returns random polite ending

### Storage Manager
- **Purpose**: Handles localStorage persistence with debouncing
- **Functions**:
  - `saveInputs(data)`: Saves form data with 300ms debounce
  - `loadInputs()`: Restores saved data on page load
  - `debounce(func, delay)`: Utility for performance optimization

### Clipboard Handler
- **Purpose**: Manages clipboard operations with fallback
- **Functions**:
  - `copyToClipboard(text)`: Primary copy function
  - `modernCopy(text)`: Uses navigator.clipboard API
  - `legacyCopy(text)`: Uses document.execCommand fallback
  - `showCopyFeedback(success)`: Displays user feedback

### UI Controller
- **Purpose**: Coordinates user interactions and updates
- **Functions**:
  - `generateReport()`: Main generation workflow
  - `updateCharacterCount()`: Real-time character counting
  - `validateInputs()`: Input validation before generation
  - `initializeApp()`: Application startup

## Data Models

### Input Data Structure
```javascript
{
  activities: string,    // Required multi-line textarea content
  learning: string,      // Optional learning insights
  plans: string         // Optional tomorrow's plans
}
```

### Report Template Structure
```javascript
{
  greeting: "お疲れ様です。本日の業務日報を報告いたします。",
  activities: string[],  // Processed activity lines
  learning: {
    header: "【学び・気づき】",
    content: string
  },
  plans: {
    header: "【明日の予定】", 
    content: string
  },
  closing: "よろしくお願いいたします。"
}
```

### Processing Rules
- **Bullet Point Patterns**: `/^[\s・\-\*\d+\.]\s*/` for line cleaning
- **Sentence Endings**: ["〜しました。", "〜を実施しました。", "〜を行いました。"]
- **Preserved Endings**: Lines ending with "。", "！", "ます", "です"

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

**Property 1: Input storage with debouncing**
*For any* input field change, the storage mechanism should save the content to localStorage after a 300ms debounce period
**Validates: Requirements 1.3**

**Property 2: Storage restoration consistency**
*For any* saved input data, reloading the page should restore the exact same content to the corresponding input fields
**Validates: Requirements 1.4**

**Property 3: Bullet point removal**
*For any* text containing bullet point markers (・, -, *, numbers with periods, full-width spaces), the input processor should remove all such markers while preserving the actual content
**Validates: Requirements 2.1**

**Property 4: Whitespace line filtering**
*For any* input text, lines containing only whitespace characters should be excluded from the processed output
**Validates: Requirements 2.2**

**Property 5: Report structure completeness**
*For any* generated report, the output should always begin with the standard greeting "お疲れ様です。本日の業務日報を報告いたします。" and end with the standard closing "よろしくお願いいたします。"
**Validates: Requirements 2.3, 3.3**

**Property 6: Japanese sentence ending preservation and enhancement**
*For any* activity line, if it ends with proper Japanese endings ("。", "！", "ます", "です") it should remain unchanged, otherwise it should receive one of the standard polite endings ("〜しました。", "〜を実施しました。", "〜を行いました。")
**Validates: Requirements 2.4, 2.5**

**Property 7: Conditional section inclusion**
*For any* optional content (learning insights or tomorrow's plans), when provided, the formatter should include the appropriate section header ("【学び・気づき】" or "【明日の予定】") followed by the content
**Validates: Requirements 3.1, 3.2**

**Property 8: Real-time character counting**
*For any* text in the output textarea, the character count display should accurately reflect the current length including line breaks and update immediately upon text changes
**Validates: Requirements 3.5**

**Property 9: Copy operation feedback**
*For any* copy button click, the system should provide appropriate user feedback (success message "コピーしました！" or failure message) and display it as a temporary notification
**Validates: Requirements 4.3, 4.4, 4.5**

**Property 10: Offline functionality**
*For any* core application operation (input processing, report generation, storage), no external network requests should be required or initiated
**Validates: Requirements 6.2**

**Property 11: File protocol clipboard handling**
*For any* clipboard operation under file protocol constraints, the system should gracefully handle API limitations without throwing unhandled errors
**Validates: Requirements 6.4**

## Error Handling

### Input Validation
- Empty required fields trigger user-friendly Japanese alert messages
- Invalid input gracefully handled without application crashes
- Malformed localStorage data handled with sensible defaults

### Clipboard Operations
- Modern API failures automatically fall back to legacy methods
- File protocol limitations handled gracefully
- Clear user feedback for both success and failure states

### Storage Operations
- localStorage unavailability handled with in-memory fallback
- Corrupted data detection and recovery mechanisms
- Debounce mechanism prevents performance degradation

## Testing Strategy

### Unit Testing Approach
The application will use browser-native testing capabilities with simple assertion functions for:
- Individual function behavior verification
- Specific edge cases and error conditions
- Integration points between components
- DOM manipulation and event handling

### Property-Based Testing Approach
Property-based testing will be implemented using **fast-check** library to verify universal properties across randomized inputs:
- Text processing functions with various Japanese text patterns
- Storage operations with different data structures
- UI interactions with diverse user input scenarios
- Each property test will run a minimum of 100 iterations
- Each property-based test will be tagged with comments referencing the specific correctness property from this design document using the format: '**Feature: daily-report-generator, Property {number}: {property_text}**'

### Testing Framework Configuration
- **Unit Testing**: Browser-native testing with custom assertion utilities
- **Property-Based Testing**: fast-check library for randomized input generation
- **Test Execution**: All tests embedded within the HTML file for single-file deployment
- **Coverage**: Both unit and property tests are complementary - unit tests catch specific bugs, property tests verify general correctness