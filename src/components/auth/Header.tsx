interface HeaderProps {
  title: string;
  desc: string;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ title, desc, className }) => {
  return (
    <div className={className}>
      <h2 className="text-4xl font-medium mb-2">{title}</h2>
      <p className="text-muted-foreground">{desc}</p>
    </div>
  );
};

export default Header;
