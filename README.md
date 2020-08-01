# jb-date-input

### format

defualt format of date input is 'YYYY-MM-DDTHH:mm:ss.SSS[Z]' that compatible and exact format of `new Date().toISOString()`    
you can change it however you need and `[Z]` mean the exact Z charecter that used in ISO standard format `YYYY-MM-DDTHH:mm:ss.SSSZ[Z]` => `2012-06-21T00:00:00.000+3:30Z`

### valueType

we have 3 value type:
```html
    <jb-date-input value="2020-08-01T14:05:39.530Z" valueType="GREGORIAN"/>
    <jb-date-input value="1596291030322" valueType="TIME_STAMP"/>
    <jb-date-input value="1399-05-01T12:05:39.530Z" valueType="JALALI"/>
```