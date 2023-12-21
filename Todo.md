Handle input field onBlur:
 - Empty when value is 0 or ''
 - No update/action when notting update (Compare value needed)
~~ -  Handler value type set to table~~
 - Set default value (0 for number field and '' for text field) when input is empty
  - Validating: Negative numbers, negative numbers in long list
 - Round value to 2 decimal places (Length, Width and Meter field only)
 - Set value and update data at final

Handle input field onFocus:
 - Empty the field if current value is 0

Handle number input unit icon

Handle thousand separator formating ( toLocaleString('en-US')) on displaying:
 - price and totalCost field
- Save value should alway number without any sepator

Handle new column for event cell with functionals:
 - Remove this row
 - Add a row below
 - Add a row upon
 - Move row up and down (Separate button, text as remove/add event, onDraft-hard ?)

Handle merge 3 cells as 1 sum cell:
 - Merge when ever value is contains + (onBlur or onChange ?)
 - Set value to Length

Handle background color for odd and even rows

Handle Price field:
 - When to allow/visible input:
Length fied type is String (contains Cộng lowercase or +)
Event cell: Add total sum count row, change this row to total count row
Main row: having a icon button allow input or just show it forever

Handle calculating:
Only calulate when price field is filled
Sum up all above Meter value
Auto calculate TotalPrice field (if meter and price are having value and > 0)

Handle final total row for final total price

Handle name for material table (Should filled with BẢNG QUYẾT TOÁN CÔNG TRÌNH)

Future upgrades:
- Fetching list of categories with it price
- Still allow to edit price when price is pre-filled as above solution
- Select rows and delete on button clicked: backspace or delete

Ultimate upgrades:
- Filling on voice listen