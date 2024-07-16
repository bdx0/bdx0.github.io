const help = [
    "whois      Who is bdx0?",
    "projects   View coding projects",
    "social     Display social network",
    "secret     Find the password",
];
const command = (cmd: string) => {
    switch (cmd.toLowerCase()) {
        case 'help':
            help;
            break;
        case 'whois':
            whois;
            break;

        case 'projects':
            projects;
            break;
    }

}
export default {
    command,
    help
};