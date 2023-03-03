
import { DayPickerSingleDateController } from 'react-dates';

export function Date() {
	return <DayPickerSingleDateController
		onOutsideClick={() => {
			console.log(`Outside click`);
		}}
		onPrevMonthClick={() => {
			console.log(`Click prev month`);
		}}
		onNextMonthClick={() => {
			console.log(`Click next month`);
		}}
		numberOfMonths={1}
	/>;
}
