export async function POST(req: Request) {
    try {
        console.log("Hitting the api");
        return Response.json({ success: true, message: "Signup successfully" }, { status: 200 });

    } catch (error) {
        console.log("Error", error);
        return Response.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}