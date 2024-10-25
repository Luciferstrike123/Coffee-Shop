import React from "react";
import { Link } from "react-router-dom";

function BlogItem({ ...props }) {
    const base_url = window.location.origin;
    return (
        <div className="border-[1.6px] w-72 md:w-96 h-[13rem] md:h-[24rem] rounded-xl overflow-hidden hover:border-[#cda154] duration-700">
            <Link to={`article/${props.articleId}`} className="flex flex-col px-2">
                <img
                    src={props.image}
                    alt={props.title}
                    className="w-full h-36 md:h-52 object-cover rounded-br-lg rounded-bl-lg"
                />
                <h1 className="text-white text-lg md:text-2xl mt-3 text-center md:px-14">
                    {props.title}
                </h1>
                <div className="hidden md:flex">
                    <span className="text-sm text-white text-center mt-4 px-2 line-clamp-4">
                        {props.body}
                    </span>
                </div>
            </Link>
        </div>
    );
}

export default BlogItem;
