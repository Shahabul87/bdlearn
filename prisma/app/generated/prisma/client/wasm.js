
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 6.6.0
 * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
 */
Prisma.prismaVersion = {
  client: "6.6.0",
  engine: "f676762280b54cd07c770017ed3711ddde35f37a"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  name: 'name',
  email: 'email',
  emailVerified: 'emailVerified',
  image: 'image',
  password: 'password',
  confirmPassword: 'confirmPassword',
  role: 'role',
  isTwoFactorEnabled: 'isTwoFactorEnabled',
  phone: 'phone',
  createdAt: 'createdAt'
};

exports.Prisma.CourseScalarFieldEnum = {
  id: 'id',
  title: 'title',
  description: 'description',
  cleanDescription: 'cleanDescription',
  imageUrl: 'imageUrl',
  price: 'price',
  isPublished: 'isPublished',
  courseGoals: 'courseGoals',
  categoryId: 'categoryId',
  courseRatings: 'courseRatings',
  activeLearners: 'activeLearners',
  userId: 'userId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  whatYouWillLearn: 'whatYouWillLearn'
};

exports.Prisma.ChapterScalarFieldEnum = {
  id: 'id',
  title: 'title',
  description: 'description',
  courseGoals: 'courseGoals',
  learningOutcomes: 'learningOutcomes',
  position: 'position',
  isPublished: 'isPublished',
  isFree: 'isFree',
  sectionCount: 'sectionCount',
  totalDuration: 'totalDuration',
  courseId: 'courseId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  estimatedTime: 'estimatedTime',
  difficulty: 'difficulty',
  prerequisites: 'prerequisites',
  resources: 'resources',
  status: 'status'
};

exports.Prisma.SectionScalarFieldEnum = {
  id: 'id',
  title: 'title',
  videoUrl: 'videoUrl',
  position: 'position',
  isPublished: 'isPublished',
  isFree: 'isFree',
  duration: 'duration',
  chapterId: 'chapterId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  type: 'type',
  isPreview: 'isPreview',
  completionStatus: 'completionStatus',
  resourceUrls: 'resourceUrls'
};

exports.Prisma.CodeExplanationScalarFieldEnum = {
  id: 'id',
  heading: 'heading',
  code: 'code',
  explanation: 'explanation',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  sectionId: 'sectionId'
};

exports.Prisma.VideoScalarFieldEnum = {
  id: 'id',
  title: 'title',
  description: 'description',
  youtubeUrl: 'youtubeUrl',
  url: 'url',
  duration: 'duration',
  rating: 'rating',
  position: 'position',
  isPublished: 'isPublished',
  sectionId: 'sectionId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  userId: 'userId'
};

exports.Prisma.BlogScalarFieldEnum = {
  id: 'id',
  title: 'title',
  url: 'url',
  author: 'author',
  description: 'description',
  rating: 'rating',
  publishedAt: 'publishedAt',
  position: 'position',
  sectionId: 'sectionId',
  userId: 'userId',
  category: 'category',
  isPublished: 'isPublished',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ArticleScalarFieldEnum = {
  id: 'id',
  title: 'title',
  content: 'content',
  url: 'url',
  source: 'source',
  summary: 'summary',
  publishedAt: 'publishedAt',
  sectionId: 'sectionId',
  userId: 'userId',
  category: 'category',
  isPublished: 'isPublished',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.NoteScalarFieldEnum = {
  id: 'id',
  title: 'title',
  content: 'content',
  isImportant: 'isImportant',
  position: 'position',
  sectionId: 'sectionId',
  userId: 'userId',
  category: 'category',
  isPublished: 'isPublished',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ProfileLinkScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  platform: 'platform',
  url: 'url',
  position: 'position',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.AccountScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  type: 'type',
  provider: 'provider',
  providerAccountId: 'providerAccountId',
  refresh_token: 'refresh_token',
  access_token: 'access_token',
  expires_at: 'expires_at',
  token_type: 'token_type',
  scope: 'scope',
  id_token: 'id_token',
  session_state: 'session_state'
};

exports.Prisma.VerificationTokenScalarFieldEnum = {
  id: 'id',
  email: 'email',
  token: 'token',
  expires: 'expires'
};

exports.Prisma.PasswordResetTokenScalarFieldEnum = {
  id: 'id',
  email: 'email',
  token: 'token',
  expires: 'expires'
};

exports.Prisma.TwoFactorTokenScalarFieldEnum = {
  id: 'id',
  email: 'email',
  token: 'token',
  expires: 'expires'
};

exports.Prisma.TwoFactorConfirmationScalarFieldEnum = {
  id: 'id',
  userId: 'userId'
};

exports.Prisma.CategoryScalarFieldEnum = {
  id: 'id',
  name: 'name'
};

exports.Prisma.AttachmentScalarFieldEnum = {
  id: 'id',
  name: 'name',
  url: 'url',
  courseId: 'courseId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.QuestionScalarFieldEnum = {
  id: 'id',
  text: 'text',
  sectionId: 'sectionId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.AnswerScalarFieldEnum = {
  id: 'id',
  text: 'text',
  isCorrect: 'isCorrect',
  questionId: 'questionId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.UserProgressScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  chapterId: 'chapterId',
  sectionId: 'sectionId',
  isCompleted: 'isCompleted',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PurchaseScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  courseId: 'courseId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.StripeCustomerScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  stripeCustomerId: 'stripeCustomerId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PostScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  title: 'title',
  description: 'description',
  imageUrl: 'imageUrl',
  published: 'published',
  category: 'category',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PostChapterSectionScalarFieldEnum = {
  id: 'id',
  title: 'title',
  postId: 'postId',
  description: 'description',
  imageUrl: 'imageUrl',
  isPublished: 'isPublished',
  isFree: 'isFree',
  position: 'position',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CommentScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  comments: 'comments',
  likes: 'likes',
  loves: 'loves',
  postId: 'postId',
  likedBy: 'likedBy',
  lovedBy: 'lovedBy',
  createdAt: 'createdAt'
};

exports.Prisma.ReplyScalarFieldEnum = {
  id: 'id',
  content: 'content',
  userId: 'userId',
  postId: 'postId',
  commentId: 'commentId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  parentReplyId: 'parentReplyId'
};

exports.Prisma.ReactionScalarFieldEnum = {
  id: 'id',
  type: 'type',
  userId: 'userId',
  commentId: 'commentId',
  replyId: 'replyId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PostImageSectionScalarFieldEnum = {
  id: 'id',
  postId: 'postId',
  imageUrl: 'imageUrl',
  caption: 'caption',
  position: 'position',
  createdAt: 'createdAt'
};

exports.Prisma.TagScalarFieldEnum = {
  id: 'id',
  name: 'name'
};

exports.Prisma.PostReactionScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  type: 'type',
  postId: 'postId',
  createdAt: 'createdAt'
};

exports.Prisma.CommentReactionScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  type: 'type',
  commentId: 'commentId',
  createdAt: 'createdAt'
};

exports.Prisma.FavoriteVideoScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  title: 'title',
  platform: 'platform',
  url: 'url',
  position: 'position',
  category: 'category',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.FavoriteAudioScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  title: 'title',
  platform: 'platform',
  url: 'url',
  position: 'position',
  category: 'category',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.FavoriteArticleScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  title: 'title',
  platform: 'platform',
  url: 'url',
  position: 'position',
  category: 'category',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.FavoriteBlogScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  title: 'title',
  platform: 'platform',
  url: 'url',
  position: 'position',
  category: 'category',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.FavoriteImageScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  title: 'title',
  platform: 'platform',
  url: 'url',
  position: 'position',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SubscriptionScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  name: 'name',
  platform: 'platform',
  url: 'url',
  category: 'category',
  dateOfSubscription: 'dateOfSubscription',
  endOfSubscription: 'endOfSubscription',
  cardUsed: 'cardUsed',
  amount: 'amount',
  position: 'position',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ReplyReactionScalarFieldEnum = {
  id: 'id',
  type: 'type',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  replyId: 'replyId',
  userId: 'userId'
};

exports.Prisma.CalendarEventScalarFieldEnum = {
  id: 'id',
  title: 'title',
  description: 'description',
  startDate: 'startDate',
  endDate: 'endDate',
  isAllDay: 'isAllDay',
  location: 'location',
  notification: 'notification',
  notificationTime: 'notificationTime',
  userId: 'userId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  isRecurring: 'isRecurring',
  recurringPattern: 'recurringPattern',
  recurringInterval: 'recurringInterval',
  recurringDays: 'recurringDays',
  recurringEndDate: 'recurringEndDate',
  parentEventId: 'parentEventId',
  externalId: 'externalId',
  source: 'source',
  lastSync: 'lastSync'
};

exports.Prisma.SupportTicketScalarFieldEnum = {
  id: 'id',
  subject: 'subject',
  category: 'category',
  message: 'message',
  status: 'status',
  userId: 'userId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.IdeaScalarFieldEnum = {
  id: 'id',
  title: 'title',
  description: 'description',
  category: 'category',
  visibility: 'visibility',
  status: 'status',
  tags: 'tags',
  likes: 'likes',
  comments: 'comments',
  collaborators: 'collaborators',
  userId: 'userId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.IdeaLikeScalarFieldEnum = {
  id: 'id',
  ideaId: 'ideaId',
  userId: 'userId',
  createdAt: 'createdAt'
};

exports.Prisma.IdeaCommentScalarFieldEnum = {
  id: 'id',
  content: 'content',
  ideaId: 'ideaId',
  userId: 'userId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.MindScalarFieldEnum = {
  id: 'id',
  title: 'title',
  description: 'description',
  content: 'content',
  category: 'category',
  visibility: 'visibility',
  status: 'status',
  tags: 'tags',
  likes: 'likes',
  views: 'views',
  shares: 'shares',
  userId: 'userId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.MindLikeScalarFieldEnum = {
  id: 'id',
  mindId: 'mindId',
  userId: 'userId',
  createdAt: 'createdAt'
};

exports.Prisma.BillScalarFieldEnum = {
  id: 'id',
  title: 'title',
  description: 'description',
  category: 'category',
  amount: 'amount',
  currency: 'currency',
  startDate: 'startDate',
  dueDate: 'dueDate',
  status: 'status',
  recurringType: 'recurringType',
  recurringPeriod: 'recurringPeriod',
  notifyBefore: 'notifyBefore',
  notifyEmail: 'notifyEmail',
  notifySMS: 'notifySMS',
  lastPaidAmount: 'lastPaidAmount',
  lastPaidDate: 'lastPaidDate',
  autoPayEnabled: 'autoPayEnabled',
  paymentMethod: 'paymentMethod',
  accountNumber: 'accountNumber',
  provider: 'provider',
  accountId: 'accountId',
  website: 'website',
  supportContact: 'supportContact',
  notes: 'notes',
  userId: 'userId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.BillAttachmentScalarFieldEnum = {
  id: 'id',
  name: 'name',
  url: 'url',
  type: 'type',
  size: 'size',
  billId: 'billId',
  createdAt: 'createdAt'
};

exports.Prisma.BillPaymentScalarFieldEnum = {
  id: 'id',
  amount: 'amount',
  paymentDate: 'paymentDate',
  method: 'method',
  status: 'status',
  reference: 'reference',
  billId: 'billId',
  createdAt: 'createdAt'
};

exports.Prisma.CourseReviewScalarFieldEnum = {
  id: 'id',
  rating: 'rating',
  comment: 'comment',
  courseId: 'courseId',
  userId: 'userId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.EnrollmentScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  courseId: 'courseId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.UserCalendarSettingsScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  defaultView: 'defaultView',
  firstDayOfWeek: 'firstDayOfWeek',
  showWeekNumbers: 'showWeekNumbers',
  enableNotifications: 'enableNotifications',
  notificationTime: 'notificationTime',
  timeZone: 'timeZone',
  workingHoursStart: 'workingHoursStart',
  workingHoursEnd: 'workingHoursEnd',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.GroupScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description',
  imageUrl: 'imageUrl',
  privacy: 'privacy',
  rules: 'rules',
  tags: 'tags',
  isPrivate: 'isPrivate',
  category: 'category',
  categoryId: 'categoryId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  creatorId: 'creatorId',
  courseId: 'courseId'
};

exports.Prisma.GroupMemberScalarFieldEnum = {
  id: 'id',
  role: 'role',
  status: 'status',
  joinedAt: 'joinedAt',
  userId: 'userId',
  groupId: 'groupId'
};

exports.Prisma.GroupNotificationScalarFieldEnum = {
  id: 'id',
  type: 'type',
  title: 'title',
  content: 'content',
  isRead: 'isRead',
  userId: 'userId',
  groupId: 'groupId',
  createdAt: 'createdAt'
};

exports.Prisma.GroupDiscussionScalarFieldEnum = {
  id: 'id',
  title: 'title',
  content: 'content',
  createdAt: 'createdAt',
  groupId: 'groupId',
  authorId: 'authorId',
  commentsCount: 'commentsCount',
  likesCount: 'likesCount'
};

exports.Prisma.GroupDiscussionLikeScalarFieldEnum = {
  id: 'id',
  discussionId: 'discussionId',
  userId: 'userId',
  createdAt: 'createdAt'
};

exports.Prisma.GroupDiscussionCommentScalarFieldEnum = {
  id: 'id',
  content: 'content',
  discussionId: 'discussionId',
  authorId: 'authorId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.GroupEventScalarFieldEnum = {
  id: 'id',
  title: 'title',
  description: 'description',
  date: 'date',
  startTime: 'startTime',
  endTime: 'endTime',
  location: 'location',
  isOnline: 'isOnline',
  meetingUrl: 'meetingUrl',
  maxAttendees: 'maxAttendees',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  creatorId: 'creatorId',
  organizerId: 'organizerId',
  groupId: 'groupId'
};

exports.Prisma.GroupEventAttendeeScalarFieldEnum = {
  id: 'id',
  status: 'status',
  eventId: 'eventId',
  userId: 'userId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.GroupResourceScalarFieldEnum = {
  id: 'id',
  title: 'title',
  description: 'description',
  type: 'type',
  url: 'url',
  fileSize: 'fileSize',
  mimeType: 'mimeType',
  thumbnail: 'thumbnail',
  createdAt: 'createdAt',
  groupId: 'groupId',
  authorId: 'authorId'
};

exports.Prisma.CustomTabScalarFieldEnum = {
  id: 'id',
  label: 'label',
  icon: 'icon',
  userId: 'userId'
};

exports.Prisma.NotificationScalarFieldEnum = {
  id: 'id',
  title: 'title',
  message: 'message',
  type: 'type',
  read: 'read',
  createdAt: 'createdAt',
  userId: 'userId'
};

exports.Prisma.MessageScalarFieldEnum = {
  id: 'id',
  content: 'content',
  read: 'read',
  createdAt: 'createdAt',
  senderId: 'senderId',
  recipientId: 'recipientId'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.JsonNullValueInput = {
  JsonNull: Prisma.JsonNull
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};

exports.Prisma.JsonNullValueFilter = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull,
  AnyNull: Prisma.AnyNull
};
exports.UserRole = exports.$Enums.UserRole = {
  STUDENT: 'STUDENT',
  TEACHER: 'TEACHER',
  PARENT: 'PARENT',
  ADMIN: 'ADMIN',
  USER: 'USER'
};

exports.ReactionType = exports.$Enums.ReactionType = {
  LIKE: 'LIKE',
  DISLIKE: 'DISLIKE',
  LOVE: 'LOVE',
  LAUGH: 'LAUGH',
  ANGRY: 'ANGRY'
};

exports.BillCategory = exports.$Enums.BillCategory = {
  UTILITY: 'UTILITY',
  INTERNET: 'INTERNET',
  INSURANCE: 'INSURANCE',
  RENT: 'RENT',
  MORTGAGE: 'MORTGAGE',
  SUBSCRIPTION: 'SUBSCRIPTION',
  TAX: 'TAX',
  CREDIT_CARD: 'CREDIT_CARD',
  OTHER: 'OTHER'
};

exports.BillStatus = exports.$Enums.BillStatus = {
  PAID: 'PAID',
  UNPAID: 'UNPAID',
  OVERDUE: 'OVERDUE',
  UPCOMING: 'UPCOMING',
  CANCELLED: 'CANCELLED'
};

exports.RecurringType = exports.$Enums.RecurringType = {
  DAILY: 'DAILY',
  WEEKLY: 'WEEKLY',
  MONTHLY: 'MONTHLY',
  QUARTERLY: 'QUARTERLY',
  YEARLY: 'YEARLY',
  CUSTOM: 'CUSTOM'
};

exports.Prisma.ModelName = {
  User: 'User',
  Course: 'Course',
  Chapter: 'Chapter',
  Section: 'Section',
  CodeExplanation: 'CodeExplanation',
  Video: 'Video',
  Blog: 'Blog',
  Article: 'Article',
  Note: 'Note',
  ProfileLink: 'ProfileLink',
  Account: 'Account',
  VerificationToken: 'VerificationToken',
  PasswordResetToken: 'PasswordResetToken',
  TwoFactorToken: 'TwoFactorToken',
  TwoFactorConfirmation: 'TwoFactorConfirmation',
  Category: 'Category',
  Attachment: 'Attachment',
  Question: 'Question',
  Answer: 'Answer',
  UserProgress: 'UserProgress',
  Purchase: 'Purchase',
  StripeCustomer: 'StripeCustomer',
  Post: 'Post',
  PostChapterSection: 'PostChapterSection',
  Comment: 'Comment',
  Reply: 'Reply',
  Reaction: 'Reaction',
  PostImageSection: 'PostImageSection',
  Tag: 'Tag',
  PostReaction: 'PostReaction',
  CommentReaction: 'CommentReaction',
  FavoriteVideo: 'FavoriteVideo',
  FavoriteAudio: 'FavoriteAudio',
  FavoriteArticle: 'FavoriteArticle',
  FavoriteBlog: 'FavoriteBlog',
  FavoriteImage: 'FavoriteImage',
  Subscription: 'Subscription',
  ReplyReaction: 'ReplyReaction',
  CalendarEvent: 'CalendarEvent',
  SupportTicket: 'SupportTicket',
  Idea: 'Idea',
  IdeaLike: 'IdeaLike',
  IdeaComment: 'IdeaComment',
  Mind: 'Mind',
  MindLike: 'MindLike',
  Bill: 'Bill',
  BillAttachment: 'BillAttachment',
  BillPayment: 'BillPayment',
  CourseReview: 'CourseReview',
  Enrollment: 'Enrollment',
  UserCalendarSettings: 'UserCalendarSettings',
  Group: 'Group',
  GroupMember: 'GroupMember',
  GroupNotification: 'GroupNotification',
  GroupDiscussion: 'GroupDiscussion',
  GroupDiscussionLike: 'GroupDiscussionLike',
  GroupDiscussionComment: 'GroupDiscussionComment',
  GroupEvent: 'GroupEvent',
  GroupEventAttendee: 'GroupEventAttendee',
  GroupResource: 'GroupResource',
  CustomTab: 'CustomTab',
  Notification: 'Notification',
  Message: 'Message'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }

        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
