//format cho string gender
export const capitalizeString = (str: string) => {
    if(!str) return '';
    return `${str[0].toUpperCase()}${str.slice(1)}`; //[1]: phần đầu viết hoa ký tự đầu; [2]: lấy từ ký tự thứ [1] đến cuối chuỗi
}

//setting color mark
export const configMarkColor = (mark: number): string => {
    if (mark >= 8) return 'green';
    if(mark >= 4) return 'goldenrod';
    return 'red';
}
