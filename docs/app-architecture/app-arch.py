from diagrams import Cluster, Diagram
from diagrams.aws.compute import EC2
from diagrams.aws.database import RDS
from diagrams.aws.management import Cloudwatch
from diagrams.aws.network import ELB, Route53
from diagrams.aws.storage import SimpleStorageServiceS3Bucket
from diagrams.custom import Custom
from diagrams.generic.device import Mobile
from diagrams.programming.language import Nodejs

with Diagram('Guruhub', direction='LR', filename='app-arch', curvestyle='ortho'):
    mobile = Mobile('Mobile')
    desktop = Custom('Desktop', './resources/desktop.png')
    stripe = Custom('Stripe', './resources/stripe-logo.png')

    with Cluster('AWS'):
      elb = ELB('ELB')
      s3 = SimpleStorageServiceS3Bucket('S3')
      cloud_watch = Cloudwatch('CloudWatch')
      route53 = Route53('Route 53')

      with Cluster('DB'):
        rds = RDS('RDS')
        postgres = Custom('Postgres', './resources/postgresql-icon.png')

      with Cluster('Auto Scaling'):
        ec2 = EC2('EC2')
        node_js = Nodejs('Node.js')


    mobile >> route53
    desktop >> route53

    route53 >> elb
    elb >> ec2 >> stripe

    ec2 >> s3
    ec2 >> cloud_watch
    ec2 >> rds
