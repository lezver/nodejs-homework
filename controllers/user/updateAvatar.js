const { wrapper } = require("../../helpers");
const path = require("node:path");
const { User } = require("../../models");
const { rename } = require("node:fs/promises");
const Jimp = require("jimp");

const avatarDir = path.join(__dirname, "..", "..", "public", "avatars");

const updateAvatar = async (req, res) => {
	const { path: tmpUpload, originalname } = req.file;
	const { _id } = req.user;

	const resizeAvatar = await Jimp.read(tmpUpload);
	await resizeAvatar.resize(250, 250);
	await resizeAvatar.write(tmpUpload);

	const newFileName = `${_id}_${originalname}`;

	const resultUpload = path.join(avatarDir, newFileName);

	await rename(tmpUpload, resultUpload);

	const avatarURL = path.join("avatars", newFileName);

	const updateAvatarUser = await User.findByIdAndUpdate(
		_id,
		{ avatarURL },
		{ new: true }
	);

	return res.status(200).send({ avatarURL: updateAvatarUser.avatarURL });
};

module.exports = { updateAvatar: wrapper(updateAvatar) };
