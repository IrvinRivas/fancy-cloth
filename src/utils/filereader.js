export const filereader = (blob) => {
    let reader = new FileReader();

    reader.readAsDataURL(blob)

    reader.onload = () => {
        console.log(reader.result);
    }
} 