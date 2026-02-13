import { auth } from "@/src/auth";
import EditUser from "@/src/components/edit-user-form";
import Typography from "@mui/material/Typography";
import prisma from "@/src/lib/prisma";

async function DashboardPage() {
  const session = await auth();

  if (!session?.user?.id) {
    return <Typography textAlign="center">Unauthorized</Typography>;
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      name: true,
      email: true,
      city: true,
      phone: true,
      address: true,
      image: true,
    },
  });

  if (!user) {
    return <Typography textAlign="center">User not found</Typography>;
  }

  return (
    <div>
      <Typography variant="h4" textAlign="center" color="primary.main">
        Profile
      </Typography>

      <EditUser user={user} />
    </div>
  );
}

export default DashboardPage;
