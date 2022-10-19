import React from 'react';
import './Content.css';
function Content() {
    return (
        <div className="px-5 my-5 pb-5">
            <h1>Don't miss</h1>
            <div className="row">
                <img
                    src="https://static.nike.com/a/images/f_auto,cs_srgb/w_1920,c_limit/993036a8-321d-4c5f-828c-eeaf7ec1dc78/nike-just-do-it.png"
                    alt=""
                />
            </div>

            <div className="content-home">
                <div className="wrapper-content">
                    <h1 className="headding">GO OUTSIDE TOGETHER</h1>
                    <p className="center">
                        As the sun keeps shining, ACG is giving you an important quest: get outside with the ones you
                        love. We’ve got you and yours covered with tees, shorts, and enough layering options to make
                        your compass spin.
                    </p>
                    <button className="btn-bottom">Shop The Collection</button>
                </div>
            </div>
        </div>
    );
}

export default Content;
