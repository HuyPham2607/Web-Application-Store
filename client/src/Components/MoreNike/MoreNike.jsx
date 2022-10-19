import './Morenike.css';
function MoreNike() {
    return (
        <div className="mx-5 my-5">
            <h2>More Nike</h2>
            <div className="row">
                <div className="col-sm-4 my-3">
                    <div className="morenike-content">
                        <img
                            className="w-100"
                            src="https://firebasestorage.googleapis.com/v0/b/store-8cd28.appspot.com/o/function%20getTime()%20%7B%20%5Bnative%20code%5D%20%7D438e34e0dfd037cb0cffeb4c0d29361b11.jpg?alt=media&token=5f3ed249-6e3f-46bf-ae24-ddfb297365ee"
                            alt=""
                        />
                        <button className="btn-morenike">Men's</button>
                    </div>
                </div>
                <div className="col-sm-4 my-3">
                    <div className="morenike-content">
                        <img
                            className="w-100"
                            src="https://static.nike.com/a/images/f_auto,cs_srgb/w_1536,c_limit/4cf07f98-713f-4ade-bdb6-76b28137c106/women-s-shoes-clothing-accessories.png"
                            alt=""
                        />
                    </div>
                    <button className="btn-morenike">Women's</button>
                </div>
                <div className="col-sm-4 my-3">
                    <div className="morenike-content">
                        <img
                            className="w-100"
                            src="https://firebasestorage.googleapis.com/v0/b/store-8cd28.appspot.com/o/function%20getTime()%20%7B%20%5Bnative%20code%5D%20%7Dhttps___hypebeast.com_wp-content_blogs.dir_6_files_2022_01_nike-kids-easy-wear-collection-11111.jpg?alt=media&token=f7332856-923d-4d58-a979-973b59296c71"
                            alt=""
                        />
                        <button className="btn-morenike">kids'</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MoreNike;
