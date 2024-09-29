import {Component, } from '@angular/core';
import {CollectionAgentService} from "../../collection-agent.service";

@Component({
  selector: 'app-produce',
  templateUrl: './produce.component.html',
  styleUrls: ['./produce.component.scss']
})



export class ProduceComponent {

  constructor(private agentService:CollectionAgentService ) {}

  processData:any
  successMessage: string = '';
  selectedProduct: any;
  isUpdateFormOpen = false;

  distributionCenterData: any
  selectedDistributionCenter: any;
  isDistributionCenterEnabled = false;

  isTableDisabled: boolean = false

  ngOnInit(): void {
    this.FarmerProcessData()
  }


  FarmerProcessData() {
    this.agentService.getFarmerProcessData().subscribe((res: any) => {
      if (res && res.data && res.data.length) {
        this.processData = res.data;
        this.isTableDisabled = true
        //this.dataSource = this.processData
      }
    },error => {
      console.log(error ,'errr sudarshan')
    })

  }


  openUpdateForm(product: any) {
    this.selectedProduct = { ...product }; // Create a copy of the product
    this.isUpdateFormOpen = true;
    this.getDistributionCenter()
  }

  closeUpdateForm() {
    this.isUpdateFormOpen = false;
  }

  confirmUpdate(): void {

    if (this.selectedProduct.status === 'approved') {
      if (!this.selectedDistributionCenter) {
        alert('Please select a distribution center.');
        return;
      }
    }

    this.selectedProduct.distributionCenter = this.selectedDistributionCenter;

    if (confirm('Are you sure you want to update this product?')) {
      this.updateProduct();
    }
  }


  updateProduct() {

    let product = this.selectedProduct
    let id = product.productId


    this.agentService.updateFarmerProcessData(id, product).subscribe(
      (response) => {

        this.successMessage = 'Data updated successfully'; // Display success message

        this.closeUpdateForm();

        setTimeout(() => {
          this.successMessage = ''; // Clear success message after 3 seconds
          location.reload()
        }, 2000);
      },
      (error) => {
        console.error('Failed to update item:', error);
      }
    );
  }


  getDistributionCenter(): void {
    this.agentService.distributionCenterTotal().subscribe((res: any) => {

      if (res && res.data && res.data.length) {
        this.distributionCenterData = res.data

      } else {
       // this.distributionTotal = 0;
      }
    })
   }

  // Method to determine if distribution center select should be enabled

  checkDistributionCenterStatus(): void {
    this.isDistributionCenterEnabled = this.selectedProduct.status === 'approved';
  }
}


