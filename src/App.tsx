import React, { createRef } from 'react';
import logo from './logo.svg';
import './App.css';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { DateValidationError, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';

type FormValues = {
  Datepicker: string
}

function App() {
  const value = dayjs('2022-04-17')
  const maxDate = dayjs('2023-07-10')
  const minDate = dayjs('2022-07-10')
  const textRef = createRef();
  const { handleSubmit, control } = useForm<FormValues>()
  const setValue = (value: dayjs.Dayjs | null) => {
    value = value
  }

  const [error, setError] = React.useState<DateValidationError | null>(null);

  const showRefContent = () => {
    // @ts-ignore
    // console.log(textRef.current && textRef.current.value);
  };

  const shouldDisableDate = (day: dayjs.Dayjs): boolean => {
    // console.log(123)
    const a = day.format("YYYY-MM-DD")
    const b = dayjs(new Date()).format("YYYY-MM-DD")
    return a === b
  }

  const errorMessage = React.useMemo(() => {
    switch (error) {
      case 'maxDate':
      case 'minDate': {
        return 'Please select a date in the first quarter of 2022';
      }

      case 'invalidDate': {
        return 'Your date is not valid';
      }

      default: {
        return '';
      }
    }
  }, [error]);
  
  const onChange = (date: dayjs.Dayjs | null) => {
    console.log(date?.format("YYYY-MM-DD"))
  }

  return (
    <>
      <div className="App">
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
            </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header> */}
      </div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TextField inputRef={textRef} />
        <button onClick={showRefContent}>Click</button>
        {/* <DemoContainer
          components={['DatePicker', 'DesktopDatePicker', 'MobileDatePicker']}
        > */}
          {/* <DemoItem label="Responsive variant"> */}
            <DatePicker
              // disablePast={true}
              // shouldDisableDate={shouldDisableDate}
              // format={"MM.DD.YYYY"}
              onError={(newError) => setError(newError)}
              slotProps={{
                textField: {
                  helperText: errorMessage,
                  variant: "standard",
                  disabled: true,
                },
              }}
              onChange={onChange}
              minDate={minDate}
              maxDate={maxDate}
              // isRequired={false}
              // inputVariant="outlined"
              // inputRef={inputRef}
            />
          {/* </DemoItem> */}
          {/* { <DemoItem label="readOnly">
            <DatePicker readOnly/>
          </DemoItem>
          <DatePicker label="Uncontrolled picker" defaultValue={dayjs('2022-04-17')} />
          <DatePicker
            label="Controlled picker"
            value={value}
            onChange={(newValue: dayjs.Dayjs | null) => setValue(newValue)}
            />
        </DemoContainer> */}
        <form onSubmit={handleSubmit((data) => console.log(data))}>
          <Controller
            control={control}
            name="Datepicker"
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <DatePicker
                onChange={onChange} // send value to hook form
                // onBlur={onBlur} // notify when input is touched/blur
                // selected={value}
              />
            )}
          />

          <input type="submit" />
        </form>
      </LocalizationProvider>
    </>
  );
}

export default App;
