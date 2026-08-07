interface ITask {
    task: string;
    time?: string;
    status: "pending" | "done" | "raise";
    submittedAt?: string;
    firstImageUrl?: string;
    secondImageUrl?: string;
}


export const newtasks: ITask[] = [
    {
        task: "Check food quality",
        status: "pending"
    },
    {
        task: "Inspect hygiene and cleanliness",
        status: "pending"
    },
    {
        task: "Verify staff discipline and attendance",
        status: "pending"
    },
    {
        task: "Review breakfast service",
        status: "pending"
    },
    {
        task: "Review lunch service",
        status: "pending"
    },
    {
        task: "Review evening snacks service",
        status: "pending"
    },
    {
        task: "Review dinner service",
        status: "pending"
    },
    {
        task: "Complete hygiene checklist",
        status: "pending"
    },
    {
        task: "Check inventory and stock status",
        status: "pending"
    },
    {
        task: "Collect student/customer feedback",
        status: "pending"
    },
    {
        task: "Report incidents or escalations",
        status: "pending"
    },
    {
        task: "Submit wastage report",
        status: "pending"
    },
    {
        task: "Record purchases made today",
        status: "pending"
    },
    {
        task: "Document improvements completed today",
        status: "pending"
    },
    {
        task: "Request management support if needed",
        status: "pending"
    },
    {
        task: "Create plan for tomorrow",
        status: "pending"
    },
    {
        task: "Submit final daily summary",
        status: "pending"
    }
];