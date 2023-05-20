import { Publish } from "@material-ui/icons";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import "./newProductt.css";
import Loading from "../../components/loading/Loading";

export default function NewProduct() {
    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState("");
    const [detail, setDetail] = useState("");
    const [link, setLink] = useState("");
    const [time, setTime] = useState("");
    const [click, setClick] = useState("");
    const [image, setImage] = useState("");
    const [imgDefault, setImgDefault] = useState(
        "https://cdn.brvn.vn/users/200px/2017/24949_Advertising-Vietnam_1507541235.png"
    );
    const [errors, setErrors] = useState({});
    const history = useHistory();
    const handleUpImage = async images => {
        setLoading(true);
        setImgDefault(URL.createObjectURL(images.target.files[0]));
        let imgArr = [];
        const formData = new FormData();

        formData.append("file", images.target.files[0]);
        formData.append("upload_preset", "zzimaj7n");
        formData.append("cloud_name", "dkwl9cttg");

        const res = await fetch(
            "https://api.cloudinary.com/v1_1/dkwl9cttg/image/upload",
            {
                method: "POST",
                body: formData,
            }
        );

        const result = await res.json();
        imgArr.push({
            public_id: result.public_id,
            url: result.secure_url,
        });
        setImage(imgArr[0].url);
        setLoading(false);
    };

    const handleSubmitForm = async e => {
        try {
            if (!image || !content || !link || !detail || !time || !click) {
                setErrors({
                    // Thiết lập thông tin lỗi cho các trường không hợp lệ
                    image: !image && "Please select an image",
                    content: !content && "Please enter the content",
                    link: !link && "Please enter the link",
                    detail: !detail && "Please enter the detail",
                    time: !time && "Please enter the time",
                    click: !click && "Please enter the click",
                });
                return;
            }
            e.preventDefault();
            const url = `http://localhost:5000/api/data/advertisiment/create`;
            const data = {
                image,
                content,
                link,
                detail,
                time,
                click,
            };
            const check = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            if (check) {
                await history.push("/advertisiment");
            }
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div className="user">
            {loading ? (
                <Loading />
            ) : (
                <>
                    <div className="userTitleContainer">
                        <h1 className="userTitle">Create Advertisiment</h1>
                    </div>
                    <div className="userContainer">
                        <div className="userUpdate">
                            <span className="userUpdateTitle">Create</span>
                            <form className="userUpdateForm">
                                <div className="userUpdateLeft">
                                    <div className="userUpdateItem">
                                        <label>Content</label>
                                        <input
                                            type="text"
                                            value={content}
                                            className="userUpdateInput"
                                            onChange={e =>
                                                setContent(e.target.value)
                                            }
                                        />
                                        {errors.content && (
                                            <span className="error">
                                                {errors.content}
                                            </span>
                                        )}
                                    </div>
                                    <div className="userUpdateItem">
                                        <label>Detail</label>
                                        <input
                                            type="text"
                                            value={detail}
                                            className="userUpdateInput"
                                            onChange={e =>
                                                setDetail(e.target.value)
                                            }
                                        />
                                        {errors.detail && (
                                            <span className="error">
                                                {errors.detail}
                                            </span>
                                        )}{" "}
                                        {/* Hiển thị thông tin lỗi nếu có */}
                                    </div>
                                    <div className="userUpdateItem">
                                        <label>Link</label>
                                        <input
                                            type="text"
                                            value={link}
                                            className="userUpdateInput"
                                            onChange={e =>
                                                setLink(e.target.value)
                                            }
                                        />{" "}
                                        {errors.link && (
                                            <span className="error">
                                                {errors.link}
                                            </span>
                                        )}{" "}
                                        {/* Hiển thị thông tin lỗi nếu có */}
                                    </div>
                                    <div className="userUpdateItem">
                                        <label>Time</label>
                                        <input
                                            type="text"
                                            value={time}
                                            className="userUpdateInput"
                                            onChange={e =>
                                                setTime(e.target.value)
                                            }
                                        />
                                        {errors.time && (
                                            <span className="error">
                                                {errors.time}
                                            </span>
                                        )}{" "}
                                        {/* Hiển thị thông tin lỗi nếu có */}
                                    </div>
                                    <div className="userUpdateItem">
                                        <label>Click</label>
                                        <input
                                            type="text"
                                            value={click}
                                            className="userUpdateInput"
                                            onChange={e =>
                                                setClick(e.target.value)
                                            }
                                        />
                                        {errors.click && (
                                            <span className="error">
                                                {errors.click}
                                            </span>
                                        )}{" "}
                                        {/* Hiển thị thông tin lỗi nếu có */}
                                    </div>
                                </div>
                                <div className="userUpdateRight">
                                    <div className="userUpdateUpload">
                                        <img
                                            className="userUpdateImg imgZoom"
                                            src={imgDefault}
                                            alt=""
                                        />
                                        {/* Hiển thị thông tin lỗi nếu có */}
                                        <label htmlFor="file">
                                            <Publish className="userUpdateIcon" />
                                        </label>
                                        <input
                                            type="file"
                                            id="file"
                                            style={{ display: "none" }}
                                            onChange={e => handleUpImage(e)}
                                        />
                                        {errors.image && (
                                            <span className="error">
                                                {errors.image}
                                            </span>
                                        )}{" "}
                                    </div>
                                    <button
                                        className="userUpdateButton"
                                        onClick={e => handleSubmitForm(e)}
                                        type="button"
                                        style={{
                                            width: "90%",
                                            marginTop: "10px",
                                            padding: "10px",
                                        }}
                                    >
                                        Update
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
