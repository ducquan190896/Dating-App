export interface Preference {
    id?: number,
    distance: number,
    genderOrientation: string,
    maxAge: number,
    minAge: number
}

export interface declaredStatePreference  {
    viewers: VIEWER[] | [],
    message: string | null,
    viewSuccess: boolean,
    viewError: boolean
}

export interface Interest {
    id?: number,
    name: string
}

export interface USER {
    id: number,
    username: string,
    firstname: string,
    surename: string,
    gender: string,
    description: string,
    roles: string[],
    avatarUrls: string[],
    birth: string,
    longitude: number,
    latitude: number,
    preference: Preference,
    interests: Interest[],
    suspended: boolean
}

export interface declaredStateUser  {
    authUser: USER | {},
    users: USER[] | [],
    userUpdateStatus: boolean,
    userUpdated: USER | {},
    message: string | null,
    authSuccess: boolean,
    authError: boolean
}

export interface ACTION {
    type: string,
    payload?: any
}

export interface LoginForm {
    username: string,
    password: string
}

export interface UserRegisterForm {
    username: string,
    firstname: string,
    surename: string,
    password: string,
    birth: string,
    description: string,
    gender: string,
    longitude: number,
    latitude: number,
    avatarUrls?: string[],
    interests: string[]
}

export interface CHANGEPASSWORD {
    currentPassword: string,
    newPassword: string,
    confirmPassword: string
}

export interface ImageData {
    image: string
}
export interface ImagesData {
    images: string[]
}
export interface VIEWER {
    id: number,
    username: string,
    firstname: string,
    surename: string,
    gender: string,
    description: string,
    roles: string[],
    avatarUrls: string[],
    birth: string,
    interests: Interest[],
    suspended: boolean,
    matchingRate: number,
    distance: number
}

export interface declaredStateView  {
    viewers: VIEWER[] | [],
    message: string | null,
    viewSuccess: boolean,
    viewError: boolean
}

export interface LIKE {
    id: number,
    likedUser: USER,
    likingUser: USER,
    matchId: number,
    createdDate: string,
    updatedDate: string,
    blocked: boolean,
    distance: number
}

export interface declaredStateLike  {
    likes: LIKE[] | [],
    like: LIKE | {},
    isExist: boolean,
    message: string | null,
    likeSuccess: boolean,
    likeError: boolean
}

export interface MATCH {
    id: number,
    user1: USER,
    user2: USER,
    createdDate: string,
    updatedDate: string,
    blocked: boolean,
    distance: number
}

export interface declaredStateMatch  {
    matches: MATCH[] | [],
    match: MATCH | {},
    isExist: boolean,
    message: string | null,
    matchSuccess: boolean,
    matchError: boolean
}
export interface PARTICIPANT {
    id: number,
    chatId: number,
    user: USER,
    read: boolean
}
export interface CHATMESSAGE {
    id: number,
    content: string,
    chatId: number,
    participant: PARTICIPANT,
    dateCreated: string,
    dateUpdated: string
}
export interface MESSAGEFORM {
    chatId: number,
    content: string,
    token?: string
}
export interface CHAT {
    id: number,
    matchId: number,
    lastMessage: CHATMESSAGE | null,
    participants: PARTICIPANT[],
    dateCreated: string,
    dateUpdated: string
}
export interface declaredStateChat {
    chats: CHAT[] |[],
    chat: CHAT | {},
    chatError: boolean,
    chatSuccess: boolean,
    message: string | null
}
export interface REPORT {
    id: number,
    reportedUser: USER,
    reportingUser: USER,
    createdDate: string,
}

export interface declaredStateReport  {
    reports: REPORT[] | [],
    report: REPORT | {},
    isReported: boolean,
    message: string | null,
    reportSuccess: boolean,
    reportError: boolean
}
export interface BLOCK {
    id: number,
    blockedUser: USER,
    blockingUser: USER,
    createdDate: string,
}

export interface declaredStateBlock  {
    blocks: BLOCK[] | [],
    block: BLOCK | {},
    isblocked: boolean,
    message: string | null,
    blockSuccess: boolean,
    blockError: boolean
}