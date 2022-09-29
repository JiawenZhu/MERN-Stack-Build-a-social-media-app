import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { checkImage } from "../../utils/imageUpload";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import { updateProfileUser } from "../../redux/actions/profileAction";

const EditProfile = ({ setOnEdit }) => {
  const initState = {
    fullname: "",
    mobile: "",
    address: "",
    gender: "",
  };
  const [userData, setUserData] = useState(initState);
  const { fullname, mobile, address, gender } = userData;
  const [avatar, setAvatar] = useState("");
  const [displayCloseBtn, setDisplayCloseBtn] = useState(false);

  const { auth, theme } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    setUserData(auth.user);
  }, [auth.user]);

  const changeAvatar = (e) => {
    const file = e.target.files[0];

    const err = checkImage(file);
    if (err)
      return dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err },
      });

    setAvatar(file);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setDisplayCloseBtn(true);
    dispatch(updateProfileUser({ userData, avatar, auth }));
  };

  return (
    <div className="edit_profile">
      <button
        className="btn btn-danger btn_close"
        onClick={() => setOnEdit(false)}
      >
        返回
      </button>

      <form onSubmit={handleSubmit}>
        <div className="info_avatar">
          <img
            src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar}
            alt="avatar"
            style={{ filter: theme ? "invert(1)" : "invert(0)" }}
          />
          <span>
            <i className="fas fa-camera" />
            <p>Change</p>
            <input
              type="file"
              name="file"
              id="file_up"
              accept="image/*"
              onChange={changeAvatar}
            />
          </span>
        </div>

        <div className="form-group">
          <label htmlFor="fullname">名</label>
          <div className="position-relative">
            <input
              type="text"
              className="form-control"
              id="fullname"
              name="fullname"
              value={fullname}
              onChange={handleInput}
            />
            <small
              className="text-danger position-absolute"
              style={{
                top: "50%",
                right: "5px",
                transform: "translateY(-50%)",
              }}
            >
              {fullname.length}/25
            </small>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="mobile">电话</label>
          <input
            type="text"
            name="mobile"
            value={mobile}
            className="form-control"
            onChange={handleInput}
          />
        </div>

        <div className="form-group">
          <label htmlFor="address">交易地址</label>
          <input
            type="text"
            name="address"
            value={address}
            className="form-control"
            onChange={handleInput}
          />
        </div>
        <label htmlFor="gender">Gender</label>
        <div className="input-group-prepend px-0 mb-4">
          <select
            name="gender"
            id="gender"
            value={gender}
            className="custom-select text-capitalize"
            onChange={handleInput}
          >
            <option value="male">男</option>
            <option value="female">女</option>
            <option value="other">Other</option>
          </select>
        </div>
        {displayCloseBtn && <button className="btn btn-outline-danger btn-close .ml-1 w-100" onClick={() => {setOnEdit(false)}}>
          返回
        </button> }     
        {!displayCloseBtn && <button className="btn btn-info w-100" type="submit">
          保存
        </button>}
      </form>
    </div>
  );
};

export default EditProfile;
