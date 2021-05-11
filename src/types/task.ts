export type task = {
    date: Date,
    description: String,
    status: 'in work' | 'done' | 'waiting to get it in work',
    tag: 'high priority' | "low priority" | "regular priority",
    id: number
}