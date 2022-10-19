import './Trending.css';

function Trending() {
    return (
        <div className="mx-5 my-3">
            <div>
                <h2>Trend</h2>
                <img
                    className="w-100"
                    src="https://firebasestorage.googleapis.com/v0/b/store-8cd28.appspot.com/o/function%20getTime()%20%7B%20%5Bnative%20code%5D%20%7Dnike-just-do-it.jpg?alt=media&token=d7bf24e5-756c-40f2-9a05-44d37ad0b693"
                    alt=""
                />
            </div>
            <div className="Trend-text">
                <div className="text-trend-home my-3">
                    <div className="headline-head">'Beyond Borders'</div>
                    <div className="headline-center">AIR JORDAN XXXVII</div>
                    <div className="headline-bottom">
                        Inspired by the classic AJ VII, the AJ XXXVII is the ultimate hybrid of speed and flight. The
                        possibilities of your game are endless when you step into these. Identifying the essential,
                        eliminating the rest.
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Trending;
