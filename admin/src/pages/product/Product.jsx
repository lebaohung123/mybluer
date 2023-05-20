import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import "./product.css";
import Loading from "../../components/loading/Loading";

export default function Product() {
    const { productId } = useParams();
    const [product, set_product] = useState({});
    const [userPost, setUserPost] = useState({});
    const [image, setImage] = useState([]);
    const [postContent, setPostContent] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const getProduct = async () => {
        try {
            const result = await axios.get(
                "http://localhost:5000/api/admin/post/" + productId
            );
            const { post } = result.data;
            set_product(post);
            setPostContent(post.content);
            setImage(post.images);
            const user = await handlerGetUser(post);
            setUserPost(user);
        } catch (error) {
            console.error(error);
        }
    };

    const handlerGetUser = async result => {
        try {
            const user = await axios(
                `http://localhost:5000/api/data/user/${result.user}`
            );
            return user.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    const handleUpdatePost = async e => {
        try {
            e.preventDefault();
            const url = `http://localhost:5000/api/data/post/${productId}/edit`;
            const data = {
                content: postContent,
                images: image,
            };
            const call = await fetch(url, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            if (call) {
                await history.push(`/posts`);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handlerDeleteImage = index => {
        const newArrayAnimals = [...image];
        newArrayAnimals.splice(index, 1);
        setImage(newArrayAnimals);
    };

    const handleUpImage = async img => {
        setLoading(true);
        let imgArr = [];
        for (const item of img.target.files) {
            const formData = new FormData();
            formData.append("file", item);
            formData.append("upload_preset", "zzimaj7n");
            formData.append("cloud_name", "dkwl9cttg");

            const res = await fetch(
                "https://api.cloudinary.com/v1_1/dkwl9cttg/image/upload",
                {
                    method: "POST",
                    body: formData,
                }
            );

            const data = await res.json();
            imgArr.push({ public_id: data.public_id, url: data.secure_url });
        }
        if (imgArr.length > 0) {
            setImage(prevImage => [...prevImage, ...imgArr]);
        }
        setLoading(false);
    };

    useEffect(() => {
        getProduct();
    }, []);

    return (
        <div className="product">
            {loading ? (
                <Loading />
            ) : (
                <div className="productTop">
                    <div className="productTopRight">
                        <div className="productInfoTop">
                            <img
                                src={userPost?.avatar}
                                alt=""
                                className="productInfoImg"
                            />
                            <span className="productName">
                                {userPost?.fullname}
                            </span>
                        </div>
                        <div className="productInfoBottom">
                            <div className="userUpdateItem">
                                <label>ID Post:</label>
                                <span>{product._id}</span>
                            </div>
                            <div className="userUpdateItem">
                                <label>Content Post</label>
                                <input
                                    type="text"
                                    value={postContent}
                                    className="userUpdateInput"
                                    onChange={e =>
                                        setPostContent(e.target.value)
                                    }
                                />
                            </div>
                            <div className="userUpdateItem">
                                <label>Like Of Post:</label>
                                <span>{product?.likes?.length}</span>
                            </div>
                            <div className="userUpdateItem">
                                <label>Comments Of Post:</label>
                                <span> {product?.comments?.length}</span>
                            </div>
                            <div className="userUpdateUpload">
                                {image.length > 0 ? (
                                    image
                                        ?.filter(
                                            img => Object.keys(img).length !== 0
                                        )
                                        .map((img, index) => {
                                            return (
                                                <div
                                                    className="productInfoItem"
                                                    key={index}
                                                >
                                                    <img
                                                        src={img.url}
                                                        alt=""
                                                        className="productUploadImg"
                                                    />
                                                    <span
                                                        className="xcss"
                                                        onClick={() =>
                                                            handlerDeleteImage(
                                                                index
                                                            )
                                                        }
                                                    >
                                                        &times;
                                                    </span>
                                                </div>
                                            );
                                        })
                                ) : (
                                    <div className="userUpdateItem">
                                        <label>Post haven't image</label>
                                    </div>
                                )}
                                <input
                                    type="file"
                                    name="file"
                                    id="file"
                                    multiple
                                    accept="image/*,video/*"
                                    onChange={img => handleUpImage(img)}
                                />
                            </div>
                        </div>
                        <div
                            className="userUpdateItem"
                            style={{ width: "70%", margin: "0 auto" }}
                        >
                            <button
                                className="productButton"
                                onClick={e => handleUpdatePost(e)}
                            >
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
