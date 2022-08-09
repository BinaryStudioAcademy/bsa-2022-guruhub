from diagrams import Cluster, Diagram
from diagrams.aws.compute import EC2
from diagrams.aws.database import RDS
from diagrams.aws.network import ELB, Route53
from diagrams.custom import Custom
from diagrams.generic.device import Mobile
from diagrams.aws.management import Cloudwatch
from diagrams.programming.language import Nodejs

with Diagram('Guruhub', direction='LR', filename='app-arch', curvestyle='curved'):
    mobile = Mobile('Mobile')
    desktop = Custom('Desktop', './resources/desktop.png')
    node_js = Nodejs

    with Cluster('AWS'):
      elb = ELB('ELB')
      cloud_watch = Cloudwatch('CloudWatch')
      route53 = Route53('Route 53')

      with Cluster('DB', direction='RL'):
        rds = RDS('RDS')
        postgres = Custom('Postgres', './resources/postgresql-icon.png')

        rds - postgres

      with Cluster('Auto-scaling'):
        ec2 = EC2('EC2')
        node_js = Nodejs('Node.js')

    mobile >> route53
    desktop >> route53

    route53 >> elb
    elb >> ec2

    ec2 >> cloud_watch
    ec2 >> rds

