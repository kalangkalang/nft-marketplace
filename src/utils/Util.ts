

const getRatingStatus = (rating:number): string => {
    switch (true) {
        case (rating >= 0 && rating <= 500):
            return 'Red';
        case (rating <= 799):
            return 'Yellow';
        default:
            return 'Green';
    }
};

export default {
    getRatingStatus
}