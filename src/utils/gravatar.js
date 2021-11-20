import md5 from "md5";

function getGravatarURL( email ) {
    return `https://s.gravatar.com/avatar/${md5(email.trim().toLowerCase(),{encoder:"binary"})}?d=identicon&s=200`;
}

export default getGravatarURL;
