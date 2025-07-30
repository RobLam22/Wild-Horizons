export const filterData = (data, locationType, locationName) => {
    return data.filter(
        (destination) =>
            destination[locationType].toLowerCase() ===
            locationName.toLowerCase()
    );
};
