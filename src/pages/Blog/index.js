import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import BlogItem from "../../components/BlogItem";
import axios from "axios";
import { useToastState } from "../../Recoil/Error/useToastState";
import Pagination from "../../components/Pagination";
import { useSearchParams } from "react-router-dom";
import { useLoadingState } from "../../Recoil/Loading/useLoadingState";

function Blog() {
    const base_url = window.location.origin;
  
    const [searchParams, setSearchParams] = useSearchParams();
    const [blogs, setBlogs] = useState([]);
    const [blogCount, setBlogCount] = useState(0);
    const [blogLimit, setBlogLimit] = useState(1);
    const [currentPage, setCurrentPage] = useState(
        localStorage.getItem("currentPage") || 1
    );
    const { setToastMsg } = useToastState();
    const { setIsLoading } = useLoadingState();

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            await axios
                .get(
                    `https://dummyjson.com/posts`
                )
                .then((resp) => {
                    setBlogs(resp.data.posts);
                    setBlogCount(resp.data.total);
                    setBlogLimit(resp.data.limit);
                })
                .catch((err) => {
                    setToastMsg({ isError: true, message: err.response.data.message });
                    localStorage.removeItem("currentPage");
                }).finally(() => setIsLoading(false))
        })();
    }, [currentPage]);

    return (
        <MainLayout>
            <div className="py-6 flex flex-col md:flex-row flex-wrap gap-6 justify-center items-center">
                {blogs.map((blog) => {
                    return (
                        <BlogItem
                            key={blog.id}
                            articleId={blog.id}
                            title={blog.title}
                            body={blog.body}
                            image="https://th.bing.com/th/id/OIP.5-HIx-ClyCC7gLSgRunfigHaE7?rs=1&pid=ImgDetMain"
                        />
                    );
                })}
            </div>
            <div className="text-center">
                <Pagination
                    currentPage={currentPage}
                    total={blogCount}
                    limit={blogLimit}
                    onPageChange={(page) => {
                        setCurrentPage(page);
                        localStorage.setItem("currentPage", page);
                        setSearchParams({ ["currentPage"]: page });
                    }}
                />
            </div>
        </MainLayout>
    );
}

export default Blog;
