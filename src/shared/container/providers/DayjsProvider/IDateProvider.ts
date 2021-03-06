interface IDateProvider {
  compareInHours(start_date: Date, end_date: Date): number;
  convertToUTC(date: Date): string;
  getCurrentDate(): Date;
}

export { IDateProvider };