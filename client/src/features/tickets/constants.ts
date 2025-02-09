export const USER_TYPES = {
    LOCAL: 'local',
    TOURIST: 'tourist'
} as const;

export type UserType = (typeof USER_TYPES)[keyof typeof USER_TYPES];
